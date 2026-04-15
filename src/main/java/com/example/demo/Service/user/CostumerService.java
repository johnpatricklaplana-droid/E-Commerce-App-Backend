package com.example.demo.Service.user;

import java.util.Set;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.productDTO.ProductResponse;
import com.example.demo.Mapper.ProductMapper;
import com.example.demo.entity.Category;
import com.example.demo.entity.Product;
import com.example.demo.repository.CostumerRepository;

@Service
public class CostumerService {

    @Autowired
    CostumerRepository costumer_Repo;

    @Autowired
    ProductMapper productMapper;

    public Set<ProductResponse> getProducts(String category) {
        
        if(category.equals("all")) {
            category = null;
        }

        Set<Product> product = costumer_Repo.getProductsFilterBy(category);
        product.forEach(prod -> prod.setVariations(null));
   
        return productMapper.toProductResponse(product);
    }
}
