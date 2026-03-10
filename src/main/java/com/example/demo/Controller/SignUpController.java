package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.userDTO.costumerAndLocationDTO;
import com.example.demo.Service.SignupService;

@RestController
public class SignUpController {

    @Autowired
    SignupService service;
    
    @PostMapping("/signup")
    public ResponseEntity<?> signup (@RequestBody costumerAndLocationDTO dto) {
        service.signup(dto);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body("Sign up successful");
    }

}
