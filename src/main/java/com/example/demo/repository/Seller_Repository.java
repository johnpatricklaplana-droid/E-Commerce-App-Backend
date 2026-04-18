package com.example.demo.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Seller;
import com.example.demo.entity.Sellers_Papers;

import jakarta.transaction.Transactional;

public interface Seller_Repository extends JpaRepository<Seller, Integer> {

    boolean existsByEmail(String email);

    Seller findByEmail(String email);
    @Modifying
    @Transactional
    @Query("""
        UPDATE Seller s
        SET s.papers = :sellerPaper
        WHERE s.id = :sellerId
    """)
    void updateSeller(@Param("sellerPaper") Sellers_Papers sellerPaper, @Param("sellerId") Integer sellerId);

    @Modifying
    @Transactional
    @Query("""
        UPDATE Seller s
        SET s.profile_pic = :imageUrl
        WHERE s.id = :sellerId
    """)
    void setSellerProfilePicture(@Param("sellerId") Integer sellerId, @Param("imageUrl") String imageUrl);

    @Query("""
        SELECT s
        FROM Seller s
        JOIN s.products as p
        LEFT JOIN FETCH s.seller_location
        LEFT JOIN FETCH s.ratings
        WHERE p.id = :productId
    """)
    Seller findSellerByProduct(@Param("productId") int productId);
    
}
