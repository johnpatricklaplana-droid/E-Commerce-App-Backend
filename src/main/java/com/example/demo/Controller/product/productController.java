package com.example.demo.Controller.product;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.UrlResource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.productDTO.ProductResponse;
import com.example.demo.DTO.productDTO.RelatedProductsDTO;
import com.example.demo.Service.product.ProductService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
public class productController {

    @Autowired
    ProductService productService;

    @GetMapping("/api/seller/product")
    public ResponseEntity<Set<ProductResponse>> getProducts (@PageableDefault(page = 0, size = 10) Pageable pageable) {
        Set<ProductResponse> productResponse = productService.getProducts(pageable);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(productResponse);
    }

    @GetMapping("/api/public/product-image/{fileName}")
    public ResponseEntity<UrlResource> getImage(@PathVariable String fileName) throws MalformedURLException {

        Path filePath = Paths.get("product_images/", fileName);
        System.out.println(filePath.toAbsolutePath());
        UrlResource resource = new UrlResource(filePath.toUri());

        return ResponseEntity
            .status(HttpStatus.OK)
            .contentType(MediaType.IMAGE_PNG)
            .header("Cache-Control", "public, max-age=31536000")
            .body(resource);
    }

    @GetMapping("/api/seller/product/{productId}")
    public ResponseEntity<Set<ProductResponse>> getProduct (@PathVariable int productId) {
        Set<ProductResponse> productResponse = productService.getProduct(productId);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(productResponse);
    }    
    
    @GetMapping("/api/public/product/{productId}")
    public ResponseEntity<ProductResponse> getMethodName(@PathVariable int productId) {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(productService.getProductPublic(productId));
    }
    
    @PostMapping("/api/public/product")
    public ResponseEntity<Set<ProductResponse>> getRelatedProducts(@RequestBody RelatedProductsDTO related) {
        return ResponseEntity
            .status(200)
            .body(productService.getRelatedProducts(related));
    }
    
}
