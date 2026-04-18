package com.example.demo.Mapper;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.DTO.productDTO.ProductCategoryDTO;
import com.example.demo.DTO.productDTO.ProductRatingDTO;
import com.example.demo.DTO.productDTO.ProductResponse;
import com.example.demo.DTO.productDTO.ProductVariationsDTO;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductImage;
import com.example.demo.entity.ProductRating;
import com.example.demo.entity.ProductVariations;
import com.example.demo.entity.Seller;

import io.jsonwebtoken.lang.Collections;

@Service
public class ProductMapper {
    
    public ProductResponse toProductResponse (Product product) {

        ProductResponse prodResponse = new ProductResponse();
        prodResponse.setId(product.getId());
        prodResponse.setPrice(product.getPrice());
        prodResponse.setProductName(product.getProductName());
        prodResponse.setProductDescription(product.getProductDescription());
        prodResponse.setThumbNailUrl(product.getThumbnail());

        Seller seller = product.getSeller();

        if(seller != null) {
            prodResponse.setSellerFirstName(seller.getFirst_name());
            prodResponse.setSellerLastName(seller.getLast_name());
            prodResponse.setSellerId(seller.getId());
            prodResponse.setSellerProfilePic(seller.getProfile_pic());
        }

        prodResponse.setCategories(toProductCategoryDTO(product.getCategories()));

        prodResponse.setVariations(toProductVariationsDTO(product.getVariations()));

        prodResponse.setRatings(toProductRatings(product.getRatings()));

        return prodResponse;
    }

    public Set<ProductCategoryDTO> toProductCategoryDTO (Set<Category> categories) {

        return categories == null 
            ? Collections.emptySet()
            : categories.stream()
            .map(cat -> {
                ProductCategoryDTO dto = new ProductCategoryDTO();
                dto.setCategoryName(cat.getCategoryName());
                dto.setCategoryDescription(cat.getDescription());

                return dto;
            })
            .collect(Collectors.toSet());
    }

    public Set<ProductVariationsDTO> toProductVariationsDTO (Set<ProductVariations> variations) {

        return variations == null 
            ? Collections.emptySet()
            : variations.stream()
                .map(variant -> {
                    ProductVariationsDTO dto = new ProductVariationsDTO();
                    dto.setVariantId(variant.getId());
                    dto.setVariationName(variant.getVariationName());
                    dto.setColor(variant.getColor());
                    dto.setPrice(variant.getPrice());
                    dto.setSku(variant.getSku());
                    dto.setImagesUrl(toImagesUrl(variant.getImages()));

                    return dto;
                })
                .collect(Collectors.toSet());
    }

    public ProductRatingDTO toProductRatings (Set<ProductRating> ratings) {

        if(ratings == null) return null;

        double rating = 0;
        int numberOfRaters = ratings.size();

        ProductRatingDTO ratingDTO = new ProductRatingDTO();
        ratingDTO.setNumberOfRaters(numberOfRaters);
        ratingDTO.setRating(rating);

        for (ProductRating pr : ratings) {
            rating += pr.getRating();
        }

        return ratingDTO;
    }

    public Set<String> toImagesUrl(Set<ProductImage> images) {

        return images == null 
            ? Collections.emptySet()
            : images.stream()
                .map(img -> img.getImageUrl())
                .collect(Collectors.toSet());
    }

    public Set<ProductResponse> toProductResponse (Set<Product> products) {

        return products.stream()
            .map(prod -> toProductResponse(prod))
            .collect(Collectors.toSet());

    }
}
