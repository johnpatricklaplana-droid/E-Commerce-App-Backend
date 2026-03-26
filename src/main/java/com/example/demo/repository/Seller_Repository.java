package com.example.demo.repository;

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
    
}
