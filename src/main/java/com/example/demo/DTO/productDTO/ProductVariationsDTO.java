package com.example.demo.DTO.productDTO;

import java.util.List;
import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductVariationsDTO {
    
    private int variantId;
    private String color;
    private String variationName;
    private String sku;
    private double price;
    
    private Set<String> imagesUrl;

}


