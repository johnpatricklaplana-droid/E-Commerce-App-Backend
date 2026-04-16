package com.example.demo.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Costumer;
import com.example.demo.entity.Product;

public interface CostumerRepository extends JpaRepository<Costumer, Integer> {

    boolean existsByEmail(String emailInput);

    Costumer findByEmail(String username);

    @Query("""
        SELECT  p
        FROM Product p
        LEFT JOIN FETCH p.categories c
        LEFT JOIN FETCH p.ratings r
        WHERE (:category IS NULL OR c.categoryName = :category)
    """)
    Set<Product> getProductsFilterBy(@Param("category") String category);
    
}
