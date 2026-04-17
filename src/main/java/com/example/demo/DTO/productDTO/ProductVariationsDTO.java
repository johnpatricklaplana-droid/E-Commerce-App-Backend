package com.example.demo.DTO.productDTO;

import java.util.List;
import java.util.Set;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductVariations;

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

    public ProductVariations toProdutVariations () {
        ProductVariations variations = new ProductVariations();
        variations.setVariationName(variationName);
        variations.setColor(color);
        variations.setPrice(price);
        return variations;
    }

}


