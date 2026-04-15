package com.example.demo.Mapper;

import java.util.HashSet;
import java.util.Set;

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

@Service
public class ProductMapper {
    
    public Set<ProductResponse> toProductResponse (
        Set<Product> product
    ) {

        Set<ProductResponse> productResponses = new HashSet<>();

        for (Product prod : product) {
            ProductResponse prodResponse = new ProductResponse();
            prodResponse.setId(prod.getId());
            prodResponse.setPrice(prod.getPrice());
            prodResponse.setProductName(prod.getProductName());
            prodResponse.setProductDescription(prod.getProductDescription());
            prodResponse.setThumbNailUrl(prod.getThumbnail());

            prodResponse.setCategories(toProductCategoryDTO(prod.getCategories()));

            prodResponse.setVariations(toProductVariationsDTO(prod.getVariations()));

            prodResponse.setRatings(toProductRatings(prod.getRatings()));

            productResponses.add(prodResponse);
        } 

        return productResponses;
    }

    public Set<ProductCategoryDTO> toProductCategoryDTO (Set<Category> categories) {

        if(categories == null) return null;

        Set<ProductCategoryDTO> categoriesDto = new HashSet<>();
        for (Category cat : categories) {
            ProductCategoryDTO dto = new ProductCategoryDTO();
            dto.setCategoryName(cat.getCategoryName());
            dto.setCategoryDescription(cat.getDescription());
            categoriesDto.add(dto);
        } 

        return categoriesDto;
    }

    public Set<ProductVariationsDTO> toProductVariationsDTO (Set<ProductVariations> variations) {

        if(variations == null) {
            return null;
        }

        Set<ProductVariationsDTO> productVariations = new HashSet<>();
        for (ProductVariations variant : variations) {
            ProductVariationsDTO dto = new ProductVariationsDTO();
            dto.setVariantId(variant.getId());
            dto.setVariationName(variant.getVariationName());
            dto.setColor(variant.getColor());
            dto.setPrice(variant.getPrice());
            dto.setSku(variant.getSku());
            dto.setImagesUrl(toImagesUrl(variant.getImages()));
            productVariations.add(dto);
        }

        return productVariations;
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

        if(images == null) return null;

        Set<String> imagesUrl = new HashSet<>();
        for (ProductImage image : images) {
            imagesUrl.add(image.getImageUrl());
        }
        return imagesUrl;
    }

}
