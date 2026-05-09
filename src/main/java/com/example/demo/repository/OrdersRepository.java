package com.example.demo.repository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Orders;
import com.example.demo.enums.PaymentStatusOrder;

public interface OrdersRepository extends JpaRepository<Orders, Integer> {

    List<Orders> findByPaymentIntentId(String paymentIntentId);

    @Query("""
        SELECT o
        FROM Orders o
        WHERE o.costumer.id = :costumerId
        AND o.paymentStatusOrder = :paymentStatus
    """)
    List<Orders> findAllPaidOrders(@Param("costumerId") int costumerId, @Param("paymentStatus") PaymentStatusOrder paymentStatusOrder);

    @Query("""
        SELECT o
        FROM Orders o
        JOIN o.product p
        WHERE o.orderDate BETWEEN :start AND :end
        AND p.seller.id = :sellerId
    """)
    List<Orders> findByOrderDateBetween(
        @Param("start") LocalDateTime lastWeek, 
        @Param("end") LocalDateTime today,
        @Param("sellerId") int sellerId
    );


    
}
