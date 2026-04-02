package com.example.demo.Service.user;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import com.example.demo.entity.Category;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Configuration.AdminProperties;
import com.example.demo.Controller.client.Location_external_API;
import com.example.demo.DTO.location.LocationDTO;
import com.example.demo.DTO.sellerDTO.SellerSignUpFieldsDTO;
import com.example.demo.Service.Jwt;
import com.example.demo.entity.Business_Registration_Documents;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductVariations;
import com.example.demo.entity.Seller;
import com.example.demo.entity.Seller_Bank_Account;
import com.example.demo.entity.Seller_Paper_Storage;
import com.example.demo.entity.Sellers_Papers;
import com.example.demo.entity.User_Location;
import com.example.demo.enums.Bank_Account_status;
import com.example.demo.enums.Business_Registration_Document_Status;
import com.example.demo.enums.User_Role;
import com.example.demo.exceptions.ActionNotAllowedException;
import com.example.demo.exceptions.EmailAlreadyExistException;
import com.example.demo.repository.Admin_Repository;
import com.example.demo.repository.BusinessRegistrationDocumentsRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ProductVariationRepository;
import com.example.demo.repository.Seller_Bank_Account_Repository;
import com.example.demo.repository.Seller_Paper_Storage_Repository;
import com.example.demo.repository.Seller_Papers_Repository;
import com.example.demo.repository.Seller_Repository;
import com.example.demo.repository.User_LocationRepository;
import com.example.demo.security.MyUserDetails;
import com.example.demo.utils.CredentialsValidator;
import com.example.demo.DTO.productDTO.ProductDTO;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class SellerService {
    
    @Autowired
    Seller_Repository seller_Repo;

    @Autowired
    Seller_Paper_Storage_Repository document_file_storage_repo;

    @Autowired
    Admin_Repository admin_repo;

    @Autowired
    CredentialsValidator credentialsValidator;

    @Autowired
    EntityManager entityManager;

    @Autowired
    BusinessRegistrationDocumentsRepository documents_repo;

    @Autowired
    Seller_Papers_Repository seller_paper_repo;

    @Autowired
    User_LocationRepository location_repo;

    @Autowired
    Seller_Repository seller_repo;

    @Autowired
    Seller_Bank_Account_Repository bank_Account_Repo;

    @Autowired
    Seller_Paper_Storage_Repository seller_Paper_Storage_Repo;

    @Autowired
    AdminProperties adminProperties;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    Jwt jwt;

    @Autowired
    ProductRepository productRepo;

    @Autowired
    ProductVariationRepository productVariationRepo;

    @Transactional
    public String signup (SellerSignUpFieldsDTO sellerInfo) {
        
        Seller seller = sellerInfo.toSeller();
        User_Location location = sellerInfo.toSellerLocation();

        credentialsValidator.validateEmail(seller.getEmail());
        credentialsValidator.validatePassword(seller.getPassword());    
        
        if(seller_Repo.existsByEmail(seller.getEmail())) {
            throw new EmailAlreadyExistException("conflict");
        }

        Integer locationId = saveLocation(location);

        saveSeller(seller, locationId);

        return jwt.generateToken(seller.getId().toString());
     
    }

    private Integer saveLocation (User_Location location) {
          
        // The result of this is always 1 or nothing for some reason
        List<LocationDTO> result = Location_external_API.getUserLocation(location);

        for (LocationDTO seller_location : result) {
            location.setRegion(seller_location.getAddress().getRegion());
            location.setLat(seller_location.getLat());
            location.setLon(seller_location.getLon());
        }

        location_repo.save(location);

        return location.getId();
    }

    private void saveSeller (Seller seller, Integer locationId) {
        List<User_Location> locations = new ArrayList<>();
        locations.add(entityManager.getReference(User_Location.class, locationId));
        
        seller.setPassword(passwordEncoder.encode(seller.getPassword()));
        seller.setSeller_location(locations);
        seller.setRole(User_Role.ROLE_SELLER);
        seller_repo.save(seller);

    }

    @Transactional
    public boolean saveBusinessRegistrationFile(MultipartFile file) {

        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        Integer sellerId = userDetails.getUserId();

        try {
            String fileName = file.getOriginalFilename();
           
            Path path = Paths.get("uploads/", fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            
            Business_Registration_Documents businessRegistrationDocuments =
                new Business_Registration_Documents();
            businessRegistrationDocuments.setFile_url(fileName);
            businessRegistrationDocuments.setStatus(Business_Registration_Document_Status.PENDING);
    
            documents_repo.save(businessRegistrationDocuments);

            Sellers_Papers sellersPapers = new Sellers_Papers();
            sellersPapers.setBusiness_registration_documents(businessRegistrationDocuments);
            seller_paper_repo.save(sellersPapers);

            seller_Repo.updateSeller(sellersPapers, sellerId);

            Seller_Paper_Storage paperStorage = new Seller_Paper_Storage();
            paperStorage.setAdmin(admin_repo.findByEmail(adminProperties.getEmail())); 
            paperStorage.setSeller_paper_id(sellersPapers);

            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

    }

    public boolean saveSellerProfilePicture(MultipartFile file) {
        
        try {
            String fileName = file.getOriginalFilename();

            Path path = Paths.get("profile_pictures/", fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
            
            MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

            Integer sellerId = userDetails.getUserId();

            seller_Repo.setSellerProfilePicture(sellerId, path.toString());

            return true;
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }

    }

    public void saveSellerBankAccount(Seller_Bank_Account bankAccount) {

        if(bankAccount.getBank_account_number().equals("") ||
           bankAccount.getBank_account_number() == null) 
           {
                throw new IllegalArgumentException("bad request body");
           }
        
        if(bankAccount.getAccount_type().equals("") ||
           bankAccount.getAccount_type() == null)
           {
                throw new IllegalArgumentException("super bad request");
           }
        
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();
        
        Integer sellerId = userDetails.getUserId();

        bankAccount.setStatus(Bank_Account_status.ACTIVE);
        bankAccount.setSeller(entityManager.getReference(Seller.class, sellerId));
        bank_Account_Repo.save(bankAccount);

    }

    @Transactional
    public void addProduct(ProductDTO product) {
        
        if(product.getProductName().equals("") || product.getProductName() == null) {
            throw new IllegalArgumentException("product name is required");
        }

        if(product.getPrice() <= 0 ) {
            throw new IllegalArgumentException("price must be greater than 0");
        }

        if(product.getColor().equals("") || product.getColor() == null) {
            throw new IllegalArgumentException("color is required");
        }

        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        Integer sellerId = userDetails.getUserId();

        Business_Registration_Documents sellerDocument = 
            seller_paper_repo.findBySellerId(sellerId)
            .getBusiness_registration_documents();

        if(sellerDocument.getStatus() == Business_Registration_Document_Status.REJECTED) {
            // TODO: add a way for the seller to know why his document was rejected and how to fix it
        }

        if(sellerDocument.getStatus() != Business_Registration_Document_Status.ACCEPTED) {
            throw new ActionNotAllowedException("you are not authorized to do some things wait for the admin to approve some of yours before you can add products");
        }

        Product prod = product.toProduct();
       
        List<Category> categories = product.getCategory();

        prod.setCategories(categories);

        productRepo.save(prod);

        ProductVariations productVariation = product.toProductVariations();
        productVariation.setProduct(prod);
        productVariation.setSku(UUID.randomUUID().toString()); // TODO: make the SKU more close to human language

        productVariationRepo.save(productVariation);
    }
    
}


