package com.example.demo.DTO.productDTO;

import java.util.List;

import com.example.demo.entity.Category;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductVariations;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductDTO {
    
    private String productName;
    private double price;
    private String color;
    private String variant;
    
    private List<Category> category;

    public Product toProduct() {
        Product product = new Product();
        product.setProductName(productName);
        product.setPrice(price);

        return product;
    }

    public ProductVariations toProductVariations () {
        ProductVariations productVariation = new ProductVariations();
        productVariation.setColor(color);
        productVariation.setVariationName(variant);

        return productVariation;
    }

    public List<Category> getCategory () {
        return category;
    }

}
