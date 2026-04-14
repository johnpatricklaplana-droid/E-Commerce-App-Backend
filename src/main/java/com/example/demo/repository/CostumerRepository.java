package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Costumer;
import com.example.demo.entity.Product;

import jakarta.persistence.OrderColumn;

public interface CostumerRepository extends JpaRepository<Costumer, Integer> {

    boolean existsByEmail(String emailInput);

    Costumer findByEmail(String username);

    @Query("""
        SELECT DISTINCT p
        FROM Product p
        JOIN FETCH p.categories c
        JOIN FETCH p.ratings r
        JOIN FETCH p.variations
        WHERE (:category IS NULL OR c.categoryName = :category)
    """)
    List<Product> getProductsFilterBy(@Param("category") String category);
    
}
