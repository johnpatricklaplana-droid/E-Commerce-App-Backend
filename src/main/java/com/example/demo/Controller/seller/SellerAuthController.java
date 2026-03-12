package com.example.demo.Controller.seller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResponseDTO.HttpResponse;
import com.example.demo.DTO.sellerDTO.SellerInfoDTO;
import com.example.demo.Service.seller.SellerAuthService;

@RestController
public class SellerAuthController {

    @Autowired
    SellerAuthService authService;
    
    @PostMapping("/signup/seller")
    public ResponseEntity<HttpResponse> signup (@RequestBody SellerInfoDTO seller_info) {
        authService.signup(seller_info);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new HttpResponse("sign up success"));
    }

}
