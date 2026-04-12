package com.example.demo.Mapper;

import java.util.ArrayList;
import java.util.List;

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
    
    public List<ProductResponse> toProductResponse (List<Product> product) {

        List<ProductResponse> productResponses = new ArrayList<>();

        for (Product prod : product) {
            ProductResponse prodResponse = new ProductResponse();
            prodResponse.setId(prod.getId());
            prodResponse.setProductName(prod.getProductName());
            prodResponse.setProductDescription(prod.getProductDescription());

            prodResponse.setCategories(toProductCategoryDTO(prod.getCategories()));

            prodResponse.setVariations(toProductVariationsDTO(prod.getVariations()));

            prodResponse.setRatings(toProductRatings(prod.getRatings()));

            productResponses.add(prodResponse);
        }

        return productResponses;
    }

    public List<ProductCategoryDTO> toProductCategoryDTO (List<Category> categories) {

        List<ProductCategoryDTO> categoriesDto = new ArrayList<>();
        for (Category cat : categories) {
            ProductCategoryDTO dto = new ProductCategoryDTO();
            dto.setCategoryName(cat.getCategoryName());
            dto.setCategoryDescription(cat.getDescription());
            categoriesDto.add(dto);
        } 

        return categoriesDto;
    }

    public List<ProductVariationsDTO> toProductVariationsDTO (List<ProductVariations> variations) {

        List<ProductVariationsDTO> productVariations = new ArrayList<>();
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

    public List<ProductRatingDTO> toProductRatings (List<ProductRating> ratings) {

        List<ProductRatingDTO> ratingsDtos = new ArrayList<>();
        for (ProductRating pr : ratings) {
            ProductRatingDTO productRatingDTO = new ProductRatingDTO();
            productRatingDTO.setRating(pr.getRating());
            productRatingDTO.setCreatedAt(pr.getCreatedAt());
            productRatingDTO.setUpdatedAt(pr.getUpdatedAt());
            ratingsDtos.add(productRatingDTO);
        }

        return ratingsDtos;
    }

    public List<String> toImagesUrl(List<ProductImage> images) {
        List<String> imagesUrl = new ArrayList<>();
        for (ProductImage image : images) {
            imagesUrl.add(image.getImageUrl());
        }
        return imagesUrl;
    }

}
