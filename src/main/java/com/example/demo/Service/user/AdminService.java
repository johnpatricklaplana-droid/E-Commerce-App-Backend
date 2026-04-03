package com.example.demo.Service.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.domain.Page; 
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Configuration.AdminProperties;
import com.example.demo.DTO.ResponseDTO.businessRegistrationDocumentDTO;
import com.example.demo.Service.Jwt;
import com.example.demo.entity.Admin;
import com.example.demo.entity.Business_Registration_Documents;
import com.example.demo.enums.Business_Registration_Document_Status;
import com.example.demo.enums.User_Role;
import com.example.demo.exceptions.ActionNotAllowedException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.repository.Admin_Repository;
import com.example.demo.repository.BusinessRegistrationDocumentsRepository;
import com.example.demo.utils.CredentialsValidator;

import jakarta.annotation.PostConstruct;

@Service
public class AdminService {

    @Autowired
    Admin_Repository adminRepo;

    @Autowired
    Jwt jwt;

    @Autowired
    CredentialsValidator validator;
    
    @Autowired
    AdminProperties adminProperties;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    BusinessRegistrationDocumentsRepository documentsRepo;

    @PostConstruct
    public void createAdmin () {

        String email = adminProperties.getEmail();
        String password = adminProperties.getPassword();
        String contactNumber = adminProperties.getContactNumber();

        if(!adminRepo.existsByEmail(email)) {
            Admin admin = new Admin();
            admin.setFirst_name("John patrick");
            admin.setLast_name("Laplana");
            admin.setEmail(email);
            admin.setPassword(encoder.encode(password));
            admin.setRole(User_Role.ROLE_ADMIN);
            admin.setContact_number(contactNumber);
            adminRepo.save(admin);
        }
    }

    public List<businessRegistrationDocumentDTO> getSellerBusinessRegistrationFile(Pageable pageable) {

        Page<Business_Registration_Documents> page = documentsRepo.findAll(pageable);

        List<Business_Registration_Documents> documents = page.getContent();

        List<businessRegistrationDocumentDTO> dto = new ArrayList<>();

        for (Business_Registration_Documents docs: documents) {
            businessRegistrationDocumentDTO docsDTO =
                new businessRegistrationDocumentDTO(
                    docs.getId(), docs.getFile_url().replace("\\", "/"), docs.getStatus().toString()
                );
            dto.add(docsDTO);
        }

        return dto;
        
    }

    public void acceptSellerBusinessRegistrationFile(int id) {
        
        Business_Registration_Documents documents = documentsRepo.findById(id)
            .orElse(null);

        if(documents == null) {
            throw new ResourceNotFoundException("the file your updating don't exist?");
        }

        if(documents.getStatus().toString().equals("REJECTED")) {
            throw new ActionNotAllowedException(
                "You rejected this one before and your accepting it now why would you do that? it's now allowed buddy"
            );
        }

        if(documents.getStatus().toString().equals("ACCEPTED")) {
            throw new ActionNotAllowedException("this one is already ACCEPTED BUDDY");
        }

        documents.setStatus(Business_Registration_Document_Status.ACCEPTED);
        documentsRepo.save(documents);

    }

    public void rejectSellerBusinessRegistrationFile(int id) {
        
        Business_Registration_Documents documents = documentsRepo.findById(id)
                .orElse(null);

        if (documents == null) {
            throw new ResourceNotFoundException("the file your updating don't exist?");
        }

        if (documents.getStatus().toString().equals("ACCEPTED")) {
            throw new ActionNotAllowedException(
                "You accepted this one before and your rejecting it now? why would you do that? it's now allowed buddy"
            );
        }

        if (documents.getStatus().toString().equals("REJECTED")) {
            throw new ActionNotAllowedException("this one is already REJECTED BUDDY have some mercy");
        }

        documents.setStatus(Business_Registration_Document_Status.REJECTED);
        documentsRepo.save(documents);

    }

}
