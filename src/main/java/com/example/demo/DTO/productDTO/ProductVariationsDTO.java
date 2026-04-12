package com.example.demo.DTO.productDTO;

import java.util.List;

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
    
    private List<String> imagesUrl;

}


