package com.example.demo.Controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.costumerDTO.costumer_InfoDTO;
import com.example.demo.Service.user.AuthService;
import com.example.demo.Service.user.UserAuthService;
import com.example.demo.entity.User;
import com.example.demo.enums.User_Role;

import jakarta.servlet.http.HttpServletResponse;

@RestController
public class CostumerController {

    @Autowired
    AuthService service;

    @Autowired
    UserAuthService userAuthService;
    
    @PostMapping("/api/auth/costumer-signup")
    public ResponseEntity<String> signup (@RequestBody costumer_InfoDTO dto) {
        service.signup(dto);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body("sign up successfully");
    }

}
