package com.example.demo.DTO.productDTO;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponse {
    private int id;
    private String productName;
    private double price;
    private String productDescription;
    
    private String thumbNailUrl;

    // category
    private List<ProductCategoryDTO> categories;

    // variations
    private List<ProductVariationsDTO> variations;

    private List<ProductRatingDTO> ratings;

    private List<ProductImagesDTO> images;
}


