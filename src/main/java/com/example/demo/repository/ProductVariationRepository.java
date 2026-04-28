package com.example.demo.repository;

import java.util.Optional;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Product;
import com.example.demo.entity.ProductVariations;

public interface ProductVariationRepository extends JpaRepository<ProductVariations, Integer> {

    Optional<ProductVariations> findByIdAndProduct_Id(int variationId, int productId);
    
    @Query("""
        SELECT v
        FROM ProductVariations v
        INNER JOIN FETCH v.product p
        WHERE v.id IN :variationIds
        AND v.product.id IN :productIds
    """)
    Set<ProductVariations> findByProductAndVariations(
        @Param("variationIds") Set<Integer> variationIds,
        @Param("productIds") Set<Integer> productIds
    );

}
