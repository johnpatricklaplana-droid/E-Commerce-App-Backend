package com.example.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Orders;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {

    List<Orders> findByPaymentIntentId(String paymentIntentId);
    
}
