package com.example.demo.Controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResponseDTO.SimpleResponseDTO;
import com.example.demo.Service.user.UserAuthService;
import com.example.demo.entity.User;

import jakarta.servlet.http.HttpServletResponse;

@RestController
public class AuthController {
    
    @Autowired
    UserAuthService userAuthService;

    @PostMapping("/api/auth/login")
    public ResponseEntity<SimpleResponseDTO> login(@RequestBody User user, 
                                               HttpServletResponse response) {

        String token = userAuthService.login(user);

        ResponseCookie cookie = ResponseCookie.from("jwt-token", token)
            .httpOnly(true)
            .secure(false)
            .path("/")
            .maxAge((long)60 * 60)
            .sameSite("Strict")
            .build();
        
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity
            .status(200)
            .body(new SimpleResponseDTO("login success", 200));
    }

}
