package com.example.demo.Service.seller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.Controller.client.Location_external_API;
import com.example.demo.DTO.location.LocationDTO;
import com.example.demo.DTO.sellerDTO.SellerInfoDTO;
import com.example.demo.entity.Admin;
import com.example.demo.entity.Business_Registration_Documents;
import com.example.demo.entity.Seller;
import com.example.demo.entity.Seller_Bank_Account;
import com.example.demo.entity.Seller_Paper_Storage;
import com.example.demo.entity.Sellers_Papers;
import com.example.demo.entity.User_Location;
import com.example.demo.enums.Business_Registration_Document_Status;
import com.example.demo.exceptions.EmailAlreadyExistException;
import com.example.demo.repository.Admin_Repository;
import com.example.demo.repository.Business_Registration_Documents_Repository;
import com.example.demo.repository.Seller_Bank_Account_Repository;
import com.example.demo.repository.Seller_Paper_Storage_Repository;
import com.example.demo.repository.Seller_Papers_Repository;
import com.example.demo.repository.Seller_Repository;
import com.example.demo.repository.User_LocationRepository;
import com.example.demo.utils.CredentialsValidator;

import jakarta.persistence.EntityManager;
import jakarta.transaction.Transactional;

@Service
public class SellerAuthService {
    
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
    Business_Registration_Documents_Repository documents_repo;

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

    @Value("${admin.email}")
    private String admin_email;

    @Transactional
    public void signup (SellerInfoDTO seller_info) {
        
        Seller seller = seller_info.toSeller();
        Sellers_Papers sellers_Papers = seller_info.toSellers_Papers();
        Seller_Bank_Account seller_Bank_Account = seller_info.toSellerBank_Account();
        User_Location location = seller_info.toSellerLocation();
        Business_Registration_Documents documents = seller_info.toBusiness_Registration_Documents();

        String email = seller.getEmail();
        String password  = seller.getPassword();

        credentialsValidator.validateEmail(email);
        credentialsValidator.validatePassword(password);    
        
        if(seller_Repo.existsByEmail(email)) {
            throw new EmailAlreadyExistException("conflict");
        }

        Integer admin_id = admin_repo.findByEmail(admin_email);
   
        List<LocationDTO> result = Location_external_API.getUserLocation(location);

        for (LocationDTO costumer_location : result) {
            location.setRegion(costumer_location.getAddress().getRegion());
            location.setLat(costumer_location.getLat());
            location.setLon(costumer_location.getLon());
        }

        location_repo.save(location);

        List<User_Location> locations = new ArrayList<>();
        locations.add(location);

        sellers_Papers.setBusiness_registration_documents(documents);
        seller_paper_repo.save(sellers_Papers);

        seller.setSeller_location(locations);
        seller.setRole("SELLER");
        seller.setPapers(sellers_Papers);
        seller_repo.save(seller);

        seller_Bank_Account.setSeller(seller);

        bank_Account_Repo.save(seller_Bank_Account);

        documents.setStatus(Business_Registration_Document_Status.PENDING);
        documents_repo.save(documents);
     
        Seller_Paper_Storage seller_File_Storage = new Seller_Paper_Storage();
        seller_File_Storage.setAdmin(entityManager.getReference(Admin.class, admin_id));
        seller_File_Storage.setSeller_paper_id(sellers_Papers);
 
        seller_Paper_Storage_Repo.save(seller_File_Storage);
    }

}
