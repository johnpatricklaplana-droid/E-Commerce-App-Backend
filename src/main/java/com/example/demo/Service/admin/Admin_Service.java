package com.example.demo.Service.admin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Admin;
import com.example.demo.enums.User_Role;
import com.example.demo.repository.Admin_Repository;

import jakarta.annotation.PostConstruct;

@Service
public class Admin_Service {

    @Autowired
    Admin_Repository admin_Repo;
    
    @Value("${admin.email}")
    private String email;
    
    @Value("${admin.password}")
    private String password;

    @Value("${admin.contact.number}")
    private String contact_number;

    @PostConstruct
    public void createAdmin () {

        if(!admin_Repo.existsByEmail("johnyheydaddy@gmail.com")) {
            Admin admin = new Admin();
            admin.setFirst_name("John patrick");
            admin.setLast_name("Laplana");
            admin.setEmail(email);
            admin.setPassword(password);
            admin.setRole(User_Role.ADMIN);
            admin.setContact_number(contact_number);
            admin_Repo.save(admin);
        }
    }

}
