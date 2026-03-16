package com.example.demo.Controller.costumer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResponseDTO.HttpResponse;
import com.example.demo.DTO.costumerDTO.costumerAndLocationDTO;
import com.example.demo.Service.costumer.AuthService;
import com.example.demo.entity.Costumer;

import jakarta.servlet.http.HttpServletResponse;

@RestController
public class AuthController {

    @Autowired
    AuthService service;
    
    @PostMapping("/signup/costumer")
    public ResponseEntity<HttpResponse> signup (@RequestBody costumerAndLocationDTO dto) {
        service.signup(dto);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new HttpResponse("sign up successfully"));
    }

    @PostMapping("/login/costumer")
    public ResponseEntity<HttpResponse> login(@RequestBody Costumer costumer, 
                                               HttpServletResponse response) {

        String token = service.login(costumer);

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
            .body(new HttpResponse("login success"));
    }

}
