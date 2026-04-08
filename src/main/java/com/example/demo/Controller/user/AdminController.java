package com.example.demo.Controller.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResponseDTO.SimpleResponseDTO;
import com.example.demo.DTO.ResponseDTO.businessRegistrationDocumentDTO;
import com.example.demo.Service.user.AdminService;
import com.example.demo.Service.user.UserAuthService;
import com.example.demo.entity.User;
import com.example.demo.enums.User_Role;

@RestController
public class AdminController {

    @Autowired
    UserAuthService userAuthService;

    @Autowired
    AdminService adminService;

    @GetMapping("/api/admin/business-registration-file")
    public ResponseEntity<List<businessRegistrationDocumentDTO>> getSellerBusinessRegistrationFile(Pageable pageable) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(adminService.getSellerBusinessRegistrationFile(pageable));
    }

    @PatchMapping("/api/admin/business-registration-file/{id}/accept")
    public ResponseEntity<SimpleResponseDTO> acceptSellerBusinessRegistrationFile (@PathVariable int id) {
        adminService.acceptSellerBusinessRegistrationFile(id);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new SimpleResponseDTO("seller accepted seller can now sell some products", 200));
    }

    @PatchMapping("/api/admin/business-registration-file/{id}/reject")
    public ResponseEntity<SimpleResponseDTO> rejectSellerBusinessRegistrationFile (@PathVariable int id) {
        adminService.rejectSellerBusinessRegistrationFile(id);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new SimpleResponseDTO("seller rejected", 200));
    }
    
}
