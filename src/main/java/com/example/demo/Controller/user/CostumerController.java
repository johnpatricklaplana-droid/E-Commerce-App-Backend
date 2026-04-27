package com.example.demo.Controller.user;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResponseDTO.SimpleResponseDTO;
import com.example.demo.DTO.costumerDTO.CartItemsDTO;
import com.example.demo.DTO.costumerDTO.costumer_InfoDTO;
import com.example.demo.DTO.productDTO.ProductResponse;
import com.example.demo.DTO.productDTO.UpdateQuantityDTO;
import com.example.demo.Service.user.AuthService;
import com.example.demo.Service.user.CostumerService;
import com.example.demo.Service.user.UserAuthService;


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
    
    @PostMapping("/api/costumer/cart/{productId}/{variantId}/{quantity}")
    public ResponseEntity<SimpleResponseDTO> addToCart(@PathVariable int productId, @PathVariable int variantId, @PathVariable int quantity) {
        String message = costumerService.addToCart(productId, variantId, quantity);
        
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new SimpleResponseDTO(message, 201));
    }
    
    @GetMapping("/api/costumer/cart")
    public ResponseEntity<Set<CartItemsDTO>> getCostumerActiveCart() {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(costumerService.getActiveCart());
    }
    
    @GetMapping("api/costumer/cart/items/count")
    public ResponseEntity<Integer> getCartItemsCount() {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(costumerService.getCartItemsCount());
    }
    
    @PatchMapping("/api/costumer/cart/items/{cartItemId}")
    public ResponseEntity<SimpleResponseDTO> updateCartItemQuantity(@PathVariable int cartItemId, @RequestBody UpdateQuantityDTO quantity) {
        costumerService.updateCartItemQuantity(cartItemId, quantity.getQuantity());
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new SimpleResponseDTO("updated one", 200));
    }

    @DeleteMapping("/api/costumer/cart/items/{cartItemId}")
    public ResponseEntity<SimpleResponseDTO> deleteCartItem (@PathVariable int cartItemId) {
        costumerService.deleteCartItem(cartItemId);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(new SimpleResponseDTO("no content", 200));
    }

}
