package com.example.demo.Service.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Configuration.AdminProperties;
import com.example.demo.Controller.client.Location_external_API;
import com.example.demo.DTO.location.LocationDTO;
import com.example.demo.DTO.sellerDTO.SellerInfoDTO;
import com.example.demo.entity.Admin;
import com.example.demo.entity.Business_Registration_Documents;
import com.example.demo.entity.Seller;
import com.example.demo.entity.Seller_Paper_Storage;
import com.example.demo.entity.Sellers_Papers;
import com.example.demo.entity.User_Location;
import com.example.demo.enums.Business_Registration_Document_Status;
import com.example.demo.enums.User_Role;
import com.example.demo.exceptions.EmailAlreadyExistException;
import com.example.demo.exceptions.UnAuthorizedException;
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

    @Autowired
    AdminProperties adminProperties;

    @Transactional
    public void signup (SellerInfoDTO seller_info) {
        
        Seller seller = seller_info.toSeller();
        Sellers_Papers sellers_Papers = seller_info.toSellers_Papers();
        User_Location location = seller_info.toSellerLocation();
        Business_Registration_Documents documents = seller_info.toBusiness_Registration_Documents();

        credentialsValidator.validateEmail(seller.getEmail());
        credentialsValidator.validatePassword(seller.getPassword());    
        
        if(seller_Repo.existsByEmail(seller.getEmail())) {
            throw new EmailAlreadyExistException("conflict");
        }

        String admin_email = adminProperties.getEmail();

        Integer admin_id = admin_repo.findByEmail(admin_email).getId();

        Integer location_id = save_location(location);

        Integer document_id = save_document(documents);

        Integer seller_paper_id = save_seller_paper(sellers_Papers, document_id);

        save_seller(seller, location_id, seller_paper_id);

        save_paper_storage(seller_paper_id, admin_id);
     
    }

    private Integer save_location (User_Location location) {
          
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

    private Integer save_document (Business_Registration_Documents documents) {

        documents.setStatus(Business_Registration_Document_Status.PENDING);
        documents_repo.save(documents);

        return documents.getId();
    }

    private Integer save_seller_paper (Sellers_Papers sellers_Papers, Integer document_id) {
        sellers_Papers.setBusiness_registration_documents(
                entityManager.getReference(Business_Registration_Documents.class, document_id));
        seller_paper_repo.save(sellers_Papers);

        return sellers_Papers.getId();
    }

    private void save_seller (Seller seller, Integer location_id, Integer seller_paper_id) {
        List<User_Location> locations = new ArrayList<>();
        locations.add(entityManager.getReference(User_Location.class, location_id));

        seller.setSeller_location(locations);
        seller.setRole(User_Role.SELLER);
        seller.setPapers(entityManager.getReference(Sellers_Papers.class, seller_paper_id));
        seller_repo.save(seller);

    }

    private void save_paper_storage (Integer seller_paper_id, Integer admin_id) {
        Seller_Paper_Storage seller_File_Storage = new Seller_Paper_Storage();
        seller_File_Storage.setAdmin(entityManager.getReference(Admin.class, admin_id));
        seller_File_Storage.setSeller_paper_id(entityManager.getReference(Sellers_Papers.class, seller_paper_id));
        seller_Paper_Storage_Repo.save(seller_File_Storage);
    }

}


