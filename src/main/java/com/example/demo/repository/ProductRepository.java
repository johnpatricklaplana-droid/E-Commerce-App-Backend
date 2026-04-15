package com.example.demo.repository;

import java.util.List;
import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    Set<Product> findBySellerId(int sellerId);
    
    // @Query("""
    //     SELECT pi
    //     FROM ProductImage pi
    //     WHERE pi.product.id = :productId
    //     AND 
    //     pi.imageType = :type
    // """)
    // ProductImage getThumbnail(@Param("productId") int productId, @Param("type") ImageType type);

    @Query("""
        SELECT p
        FROM Product p
        WHERE p.id = :productId
        AND p.seller.id = :sellerId
    """)
    Product getProduct(@Param("productId") int productId, @Param("sellerId") int sellerId);

}
