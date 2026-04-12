package com.example.demo.Controller.user;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTO.ResponseDTO.SimpleResponseDTO;
import com.example.demo.DTO.productDTO.CreateProductRequest;
import com.example.demo.DTO.productDTO.ProductVariationsDTO;
import com.example.demo.DTO.sellerDTO.SellerSignUpFieldsDTO;
import com.example.demo.Service.user.SellerService;
import com.example.demo.Service.user.UserAuthService;
import com.example.demo.entity.Seller_Bank_Account;

import jakarta.servlet.http.HttpServletResponse;

@RestController
public class SellerController {

    @Autowired
    SellerService sellerService;

    @Autowired
    UserAuthService userAuthService;
    
    @PostMapping("/api/auth/seller-signup")
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

    @PostMapping("/api/seller/business-registration-file")
    public ResponseEntity<SimpleResponseDTO> insertBusinessRegistrationFile (@RequestParam("file") MultipartFile file) {
        
        if(!sellerService.saveBusinessRegistrationFile(file)) {
            return ResponseEntity
                    .status(HttpStatus.CONFLICT)
                    .body(new SimpleResponseDTO("failed to upload file kasalanan mo to eh", 409));
        } 
       
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(new SimpleResponseDTO("successful one", 201));

    }

    @PostMapping("/api/seller/profile-picture")
    public ResponseEntity<SimpleResponseDTO> saveSellerProfilePicture(@RequestParam("file") MultipartFile file) {
        sellerService.saveSellerProfilePicture(file);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new SimpleResponseDTO("success", 201));
    }

    @PostMapping("/api/seller/bank-account")
    public ResponseEntity<SimpleResponseDTO> saveSellerBankAccount(@RequestBody Seller_Bank_Account bankAccount) {
        sellerService.saveSellerBankAccount(bankAccount);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new SimpleResponseDTO("successful one", 201));
    }
    
    @PostMapping("/api/seller/product") 
    public ResponseEntity<String> addProduct(@RequestBody CreateProductRequest product
    ) throws IOException {
        Integer productId = sellerService.addProduct(product);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body("{ \"productId\": " + productId + "}");
    }

    @PostMapping("/api/seller/product-variant/{productId}")
    public ResponseEntity<String> postMethodName(
        @PathVariable int productId,
        @RequestPart("productVariation") ProductVariationsDTO variation,
        @RequestPart("images") List<MultipartFile> images
    ) throws IOException {

        Integer variantId = sellerService.saveVariant(productId, variation, images);
        
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body("{ \"variantId\": " + variantId + "}");
    }
    
    
}
