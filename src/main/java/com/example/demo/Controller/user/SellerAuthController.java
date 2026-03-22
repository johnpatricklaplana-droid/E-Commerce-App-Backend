package com.example.demo.Controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResponseDTO.AuthResponseDTO;
import com.example.demo.DTO.sellerDTO.SellerSignUpFieldsDTO;
import com.example.demo.Service.user.SellerAuthService;
import com.example.demo.Service.user.UserAuthService;
import com.example.demo.entity.User;
import com.example.demo.enums.User_Role;

@RestController
public class SellerAuthController {

    @Autowired
    SellerAuthService sellerAuthService;

    @Autowired
    UserAuthService userAuthService;
    
    @PostMapping("/signup/seller")
    public ResponseEntity<AuthResponseDTO> signup (@RequestBody SellerSignUpFieldsDTO seller_info) {
        sellerAuthService.signup(seller_info);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new AuthResponseDTO("signup success", 201));
    }

    @PostMapping("/login/seller")
    public ResponseEntity<AuthResponseDTO> login (@RequestBody User user) {
        userAuthService.login(user, User_Role.SELLER);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new AuthResponseDTO("login success", 200));
    }

}
