package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.CostumersCart;

public interface CosumersCartRepository extends JpaRepository<CostumersCart, Integer> {

    @Query("""
        SELECT c
        FROM CostumersCart c
        WHERE c.costumer.id = :costumerId
        AND c.status = com.example.demo.enums.CartStatus.ACTIVE
    """)
    CostumersCart getActiveCart(@Param("costumerId") int costumerId);
    
}
