package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.ProductVariations;

public interface ProductVariationRepository extends JpaRepository<ProductVariations, Integer> {
    
}
