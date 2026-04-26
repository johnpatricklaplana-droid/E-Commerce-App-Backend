package com.example.demo.DTO.costumerDTO;

import java.time.LocalDateTime;
import java.util.Set;

import com.example.demo.DTO.location.LocationDTO;
import com.example.demo.DTO.productDTO.ProductDTO;
import com.example.demo.DTO.productDTO.ProductVariationsDTO;
import com.example.demo.DTO.sellerDTO.SellerDTO;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class CartItemsDTO {
    
    private int cartItemId;
    private LocalDateTime addedDate;
    private int quantity;

    private ProductDTO product;

    private ProductVariationsDTO variations;

    private Set<LocationDTO> location;

    private SellerDTO seller;

}
