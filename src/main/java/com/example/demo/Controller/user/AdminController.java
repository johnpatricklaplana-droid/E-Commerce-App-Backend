package com.example.demo.Controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import com.example.demo.entity.Business_Registration_Documents;

import com.example.demo.Service.user.AdminService;
import com.example.demo.Service.user.UserAuthService;
import com.example.demo.entity.User;
import com.example.demo.enums.User_Role;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class AdminController {

    @Autowired
    UserAuthService userAuthService;

    @Autowired
    AdminService adminService;
    
    @PostMapping("/login/admin")
    public ResponseEntity<String> login (@RequestBody User user) {
        String token = userAuthService.login(user, User_Role.ROLE_ADMIN);

        String cookie = "token=" + token + "; httpOnly; path=/; Max-Age=3600; SameSite=Strict";

        return ResponseEntity
            .status(HttpStatus.OK)
            .header("Set-Cookie", cookie)
            .body("login success");
    }

    @GetMapping("/seller/business-registration-file")
    public Page<Business_Registration_Documents> getSellerBusinessRegistrationFile(Pageable pageable) {
        return adminService.getSellerBusinessRegistrationFile(pageable);
    }
    
}
