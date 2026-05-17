package com.example.demo.Mapper;

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

        prodResponse.setCategories(toProductCategoryDTO(product.getCategories()));

        prodResponse.setVariations(toProductVariationsDTO(product.getVariations()));

        prodResponse.setRatings(toProductRatings(product.getRatings()));

        prodResponse.setStock(getProductStock(product));
        prodResponse.setSales(getProductSales(product));
        prodResponse.setProductRevenue(getProductRevenue(product));

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

    private Integer getProductStock (Product product) {
        return product.getVariations() == null 
        ? null 
        : product.getVariations().stream()
            .mapToInt(var -> var.getStock())
            .sum(); 
    }

    private Integer getProductSales (Product product) {
        if(product.getVariations() == null) return null;
        return product.getVariations().stream()
            .mapToInt(var -> var.getSales())
            .sum();
    }

    public double getProductRevenue (Product product) {
        if(product.getVariations() == null) return 0;
        return product.getVariations().stream()
            .mapToDouble(var -> var.getSales() * var.getPrice())
            .sum();
    }

}
