package com.example.demo.Controller.user;

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

import com.example.demo.DTO.ResponseDTO.SimpleResponseDTO;
import com.example.demo.DTO.sellerDTO.SellerBankAccountDTO;
import com.example.demo.DTO.sellerDTO.SellerSignUpFieldsDTO;
import com.example.demo.Service.user.SellerService;
import com.example.demo.Service.user.UserAuthService;
import com.example.demo.entity.Business_Registration_Documents;
import com.example.demo.entity.User;
import com.example.demo.enums.User_Role;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
public class SellerController {

    @Autowired
    SellerService sellerService;

    @Autowired
    UserAuthService userAuthService;
    
    @PostMapping("/signup/seller")
    public ResponseEntity<SimpleResponseDTO> signup (@RequestBody SellerSignUpFieldsDTO sellerInfo,
        HttpServletResponse response
    ) {
        String token = sellerService.signup(sellerInfo);

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
            .body(new SimpleResponseDTO("signup success", 201));
    }

    @PostMapping("/login/seller")
    public ResponseEntity<SimpleResponseDTO> login (@RequestBody User user) {
        userAuthService.login(user, User_Role.ROLE_SELLER);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new SimpleResponseDTO("login success", 200));
    }

    @PostMapping("/seller/business-registration-file")
    public ResponseEntity<SimpleResponseDTO> insertBusinessRegistrationFile (@RequestParam("file") MultipartFile file, HttpServletRequest request) {
        
        if(!sellerService.saveBusinessRegistrationFile(file, request)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new SimpleResponseDTO("failed to upload file kasalanan mo to eh", 409));
        } 
       
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new SimpleResponseDTO("successful one", 201));

    }

    @PostMapping("/seller/bank-account")
    public ResponseEntity<SimpleResponseDTO> saveSellerBankAccount(@RequestBody SellerBankAccountDTO sellerBankAccount, HttpServletRequest request) {
        sellerService.saveSellerBankAccount(sellerBankAccount, request);
        
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new SimpleResponseDTO("created one", 201));
    }

}
