package com.example.demo.Service.user;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.productDTO.ProductResponse;
import com.example.demo.Mapper.ProductMapper;
import com.example.demo.entity.Product;
import com.example.demo.repository.CostumerRepository;

@Service
public class CostumerService {

    @Autowired
    CostumerRepository costumer_Repo;

    @Autowired
    ProductMapper productMapper;

    public List<ProductResponse> getProducts(String category) {
        
        if(category.equals("all")) {
            category = null;
        }

        List<Product> product = costumer_Repo.getProductsFilterBy(category);

        return productMapper.toProductResponse(product);
    }
}
