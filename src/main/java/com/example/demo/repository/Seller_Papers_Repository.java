package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Sellers_Papers;

public interface Seller_Papers_Repository extends JpaRepository<Sellers_Papers, Integer> {

    @Query("""   
        SELECT sp
        FROM Sellers_Papers sp 
        JOIN FETCH sp.seller s
        WHERE s.id = :sellerId  
    """)    
    Sellers_Papers findBySellerId(Integer sellerId);
    
}
