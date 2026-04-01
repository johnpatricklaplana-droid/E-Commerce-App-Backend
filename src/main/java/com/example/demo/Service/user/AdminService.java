package com.example.demo.Service.user;

import java.util.List;

import org.springframework.data.domain.Page; 
import org.springframework.data.domain.Pageable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Configuration.AdminProperties;
import com.example.demo.Service.Jwt;
import com.example.demo.entity.Admin;
import com.example.demo.entity.Business_Registration_Documents;
import com.example.demo.enums.User_Role;
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

    public Page<Business_Registration_Documents> getSellerBusinessRegistrationFile(Pageable pageable) {

        return documentsRepo.findAll(pageable);
    }

}
