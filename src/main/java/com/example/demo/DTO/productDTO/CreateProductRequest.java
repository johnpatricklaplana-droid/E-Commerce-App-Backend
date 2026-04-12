package com.example.demo.DTO.productDTO;

import java.util.List;

import com.example.demo.entity.Category;
import com.example.demo.entity.Product;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateProductRequest {
  
    private String productName;
    private String productDescription;

    private List<Category> category;

    public Product toProduct() {
        Product product = new Product();
        product.setProductName(productName);

        return product;
    }

    public List<Category> getCategory () {
        return category;
    }

}
