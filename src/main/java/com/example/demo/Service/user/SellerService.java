package com.example.demo.Service.user;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.Configuration.AdminProperties;
import com.example.demo.Controller.client.Location_external_API;
import com.example.demo.DTO.location.LocationDTO;
import com.example.demo.DTO.productDTO.CreateProductRequest;
import com.example.demo.DTO.productDTO.ProductVariationsDTO;
import com.example.demo.DTO.sellerDTO.RatingsDTO;
import com.example.demo.DTO.sellerDTO.SellerInfo;
import com.example.demo.DTO.sellerDTO.SellerSignUpFieldsDTO;
import com.example.demo.Mapper.ProductMapper;
import com.example.demo.Service.Jwt;
import com.example.demo.Service.product.ProductService;
import com.example.demo.entity.Business_Registration_Documents;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductImage;
import com.example.demo.entity.ProductVariations;
import com.example.demo.entity.Seller;
import com.example.demo.entity.SellerRatings;
import com.example.demo.entity.Seller_Bank_Account;
import com.example.demo.entity.Seller_Paper_Storage;
import com.example.demo.entity.Sellers_Papers;
import com.example.demo.entity.User_Location;
import com.example.demo.enums.Bank_Account_status;
import com.example.demo.enums.Business_Registration_Document_Status;
import com.example.demo.enums.User_Role;
import com.example.demo.exceptions.ActionNotAllowedException;
import com.example.demo.exceptions.EmailAlreadyExistException;
import com.example.demo.exceptions.ResourceAlreadyExistException;
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

    @Autowired
    ProductService productService;

    @Autowired
    ProductMapper productMapper;

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

        Set<String> roles = new HashSet<>();
        roles.add(User_Role.ROLE_SELLER.toString());

        return jwt.generateToken(seller.getId().toString(), roles);
     
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
        Set<User_Location> locations = new HashSet<>();
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

            Business_Registration_Documents businessRegistrationDocuments =
                new Business_Registration_Documents();
            businessRegistrationDocuments.setFile_url(fileName);
            businessRegistrationDocuments.setStatus(Business_Registration_Document_Status.PENDING);

            Seller seller = seller_Repo.findById(sellerId)
                .orElse(null);

            if(seller.getPapers() != null) {
                Sellers_Papers sellers_Papers = seller_paper_repo.findById(seller.getPapers().getId())
                        .orElse(null);

                if (sellers_Papers.getBusiness_registration_documents() != null) {
                    throw new ResourceAlreadyExistException("User already has documents. Do you want to continue?");
                }
            }
    
            documents_repo.save(businessRegistrationDocuments);
           
            Path path = Paths.get("uploads/", fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());

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
    public Integer addProduct(CreateProductRequest product, MultipartFile thumbnail) throws IOException {
        
        if(product.getProductName().equals("") || product.getProductName() == null) {
            throw new IllegalArgumentException("product name is required");
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

        String fileName = thumbnail.getOriginalFilename();
       
        Set<Category> categories = product.getCategory();

        prod.setCategories(categories);
        prod.setSeller(entityManager.getReference(Seller.class, sellerId));
        prod.setProductDescription(product.getProductDescription());
        prod.setThumbnail(fileName);
        productRepo.save(prod);   

        Path path = Paths.get("product_images", fileName);
        Files.createDirectories(path.getParent());
        Files.write(path, thumbnail.getBytes());
       
        return prod.getId();
    }

    public ProductVariationsDTO saveVariant (int productId, ProductVariationsDTO product, List<MultipartFile> images) throws IOException {

        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        Integer sellerId = userDetails.getUserId();

        Product prod = productRepo.getProduct(productId, sellerId);

        if(prod == null) {
            throw new ActionNotAllowedException("opps that's bad");
        }

        ProductVariationsDTO productVariation = product;
        ProductVariations variations = productVariation.toProdutVariations();
        variations.setProduct(entityManager.getReference(Product.class, productId));
        variations.setSku(UUID.randomUUID().toString());
        
        productVariationRepo.save(variations);  

        Set<ProductImage> imgs = productService.saveProductImages(variations.getId(), images);
        variations.setImages(imgs);

        // mapper expects a collection, so wrap single variation in Set
        // then extract the only element from the result
        Set<ProductVariations> variationsResponse = new HashSet<>();
        variationsResponse.add(variations);
        
        return productMapper.toProductVariationsDTO(variationsResponse).iterator().next();

    }

    public SellerInfo getSeller(int productId) {
        
        Seller seller = seller_Repo.findSellerByProduct(productId);

        SellerInfo sellerInfo = new SellerInfo();
        sellerInfo.setFirstName(seller.getFirst_name());
        sellerInfo.setLastName(seller.getLast_name());
        sellerInfo.setProfilePic(seller.getProfile_pic());
        sellerInfo.setSellerId(seller.getId());

        Set<SellerRatings> ratings = seller.getRatings();

        Set<RatingsDTO> ratingsDTOs = ratings.stream()
            .map(rat -> {
                RatingsDTO dto = new RatingsDTO();
                dto.setRating(rat.getRating());
                dto.setReview(rat.getReview());
                dto.setCreatedAt(rat.getCreatedAt());
                dto.setUpdatedAt(rat.getUpdatedAt());

                return dto;
            })
            .collect(Collectors.toSet());

        sellerInfo.setRatings(ratingsDTOs);
        
        Set<User_Location> locations = seller.getSeller_location();

        Set<LocationDTO> locationDTOs = locations.stream()
            .map(loc -> {
                LocationDTO dto = new LocationDTO();
                dto.setCountry(loc.getCountry());
                dto.setCity(loc.getCity());
                dto.setLat(loc.getLat());
                dto.setLon(loc.getLon());
                dto.setPostcode(loc.getPostal_code());
                dto.setProvince(loc.getProvince());
                dto.setStreet(loc.getStreet());
                
                return dto;
            })
            .collect(Collectors.toSet());

        sellerInfo.setLocation(locationDTOs);

        return sellerInfo;
    }
    
}


