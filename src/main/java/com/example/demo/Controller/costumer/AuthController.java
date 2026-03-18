package com.example.demo.Controller.costumer;

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
public class AuthController {

    @Autowired
    AuthService service;

    @Autowired
    UserAuthService userAuthService;
    
    @PostMapping("/signup/costumer")
    public ResponseEntity<String> signup (@RequestBody costumer_InfoDTO dto) {
        service.signup(dto);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body("sign up successfully");
    }

    @PostMapping("/login/costumer")
    public ResponseEntity<String> login(@RequestBody User user, 
                                               HttpServletResponse response) {

        String token = userAuthService.login(user, User_Role.COSTUMER);

        ResponseCookie cookie = ResponseCookie.from("jwt-token", token)
            .httpOnly(true)
            .secure(false)
            .path("/")
            .maxAge(60 * 60)
            .sameSite("Strict")
            .build();
        
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity
            .status(200)
            .body("login success");
    }

}
