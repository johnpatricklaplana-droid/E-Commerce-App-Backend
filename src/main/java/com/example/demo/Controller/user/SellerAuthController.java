package com.example.demo.Controller.user;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTO.ResponseDTO.AuthResponseDTO;
import com.example.demo.DTO.sellerDTO.SellerSignUpFieldsDTO;
import com.example.demo.Service.user.SellerAuthService;
import com.example.demo.Service.user.UserAuthService;
import com.example.demo.entity.User;
import com.example.demo.enums.User_Role;

import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class SellerAuthController {

    @Autowired
    SellerAuthService sellerAuthService;

    @Autowired
    UserAuthService userAuthService;
    
    @PostMapping("/signup/seller")
    public ResponseEntity<AuthResponseDTO> signup (@RequestBody SellerSignUpFieldsDTO sellerInfo,
        HttpServletResponse response
    ) {
        String token = sellerAuthService.signup(sellerInfo);

        ResponseCookie cookie = ResponseCookie.from("jwt-token", token)
            .httpOnly(true)
            .secure(false)
            .path("/")
            .maxAge((long)60 * 60)
            .sameSite("Strict")
            .build();
        
        response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new AuthResponseDTO("signup success", 201));
    }

    @PostMapping("/login/seller")
    public ResponseEntity<AuthResponseDTO> login (@RequestBody User user) {
        userAuthService.login(user, User_Role.ROLE_SELLER);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new AuthResponseDTO("login success", 200));
    }

    @PostMapping("/business-registration-file/seller")
    public ResponseEntity<AuthResponseDTO> insertBusinessRegistrationFile (@RequestParam("file") MultipartFile file) {
        
        try {
            String fileName = file.getOriginalFilename();

            Path path = Paths.get("uploads/", fileName);
            Files.createDirectories(path.getParent());
            Files.write(path, file.getBytes());
        } catch (IOException e) {
            return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new AuthResponseDTO("failed to upload file kasalanan mo to eh", 409));
        }

        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new AuthResponseDTO("successful one", 201));
    }

}
