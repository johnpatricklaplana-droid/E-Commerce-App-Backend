package com.example.demo.DTO.productDTO;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductResponse {
    private int id;
    private String productName;
    private String productDescription;
    private double price;
    
    private String thumbNailUrl;

    private int sellerId;
    private String sellerFirstName;
    private String sellerLastName;
    private String sellerProfilePic;

    // category
    private Set<ProductCategoryDTO> categories;

    // variations
    private Set<ProductVariationsDTO> variations;

    private ProductRatingDTO ratings;

}


