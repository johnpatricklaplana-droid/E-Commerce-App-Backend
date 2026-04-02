package com.example.demo.Controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResponseDTO.SimpleResponseDTO;
import com.example.demo.DTO.ResponseDTO.businessRegistrationDocumentDTO;
import com.example.demo.Service.user.AdminService;
import com.example.demo.Service.user.UserAuthService;
import com.example.demo.entity.Business_Registration_Documents;
import com.example.demo.entity.User;
import com.example.demo.enums.User_Role;

@RestController
public class AdminController {

    @Autowired
    UserAuthService userAuthService;

    @Autowired
    AdminService adminService;
    
    @PostMapping("/login/admin")
    public ResponseEntity<SimpleResponseDTO> login (@RequestBody User user) {
        String token = userAuthService.login(user, User_Role.ROLE_ADMIN);

        String cookie = "jwt-token=" + token + "; httpOnly; path=/; Max-Age=3600; SameSite=Strict";

        return ResponseEntity
            .status(HttpStatus.OK)
            .header("Set-Cookie", cookie)
            .body(new SimpleResponseDTO("login success", 200));
    }

    @GetMapping("/seller/business-registration-file")
    public ResponseEntity<List<businessRegistrationDocumentDTO>> getSellerBusinessRegistrationFile(Pageable pageable) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(adminService.getSellerBusinessRegistrationFile(pageable));
    }
    
}
