package com.example.demo.Controller.product;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.demo.DTO.ResponseDTO.SimpleResponseDTO;
import com.example.demo.DTO.productDTO.ProductResponse;
import com.example.demo.Service.product.ProductService;
import com.example.demo.entity.Product;

import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class productController {

    @Autowired
    ProductService productService;

    @GetMapping("/api/seller/product")
    public ResponseEntity<List<ProductResponse>> getProducts (Pageable pageable) {
        List<ProductResponse> productResponse = productService.getProducts(pageable);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(productResponse);
    }

    @GetMapping("/api/seller/product-image/{fileName}")
    public ResponseEntity<UrlResource> getMethodName(@PathVariable String fileName) throws MalformedURLException {

        Path filePath = Paths.get("product_images/", fileName);
        System.out.println(filePath.toAbsolutePath());
        UrlResource resource = new UrlResource(filePath.toUri());

        return ResponseEntity
            .status(HttpStatus.OK)
            .contentType(MediaType.IMAGE_PNG)
            .body(resource);
    }

    @GetMapping("/api/seller/product/{productId}")
    public ResponseEntity<List<ProductResponse>> getProduct (@PathVariable int productId) {
        List<ProductResponse> productResponse = productService.getProduct(productId);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(productResponse);
    }    
    
}
