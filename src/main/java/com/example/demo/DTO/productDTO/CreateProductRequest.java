package com.example.demo.DTO.productDTO;

import java.util.List;
import java.util.Set;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProductRequest {
  
    private String productName;
    private String productDescription;
    private double price;

    private Set<Category> category;

    public Product toProduct() {
        Product product = new Product();
        product.setProductName(productName);

        return product;
    }

    public Set<Category> getCategory () {
        return category;
    }

}
