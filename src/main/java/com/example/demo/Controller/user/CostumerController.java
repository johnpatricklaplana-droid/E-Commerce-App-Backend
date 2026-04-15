package com.example.demo.Controller.user;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.costumerDTO.costumer_InfoDTO;
import com.example.demo.DTO.productDTO.ProductResponse;
import com.example.demo.Service.user.AuthService;
import com.example.demo.Service.user.CostumerService;
import com.example.demo.Service.user.UserAuthService;
import com.example.demo.entity.User;
import com.example.demo.enums.User_Role;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class CostumerController {

    @Autowired
    AuthService service;

    @Autowired
    UserAuthService userAuthService;

    @Autowired
    CostumerService costumerService;
    
    @PostMapping("/api/auth/costumer-signup")
    public ResponseEntity<String> signup (@RequestBody costumer_InfoDTO dto) {
        service.signup(dto);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body("sign up successfully");
    }

    @GetMapping("/api/public/costumer/product")
    public ResponseEntity<Set<ProductResponse>> getProducts(@RequestParam(defaultValue = "all") String category) {
        Set<ProductResponse> productResponse = costumerService.getProducts(category);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(productResponse);
    }
    

}
