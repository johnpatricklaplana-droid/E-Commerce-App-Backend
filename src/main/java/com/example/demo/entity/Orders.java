package com.example.demo.entity;

import java.time.LocalDateTime;

import com.example.demo.enums.OrderReturnStatus;
import com.example.demo.enums.OrderStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
@NoArgsConstructor
public class Orders {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "costumer_id")
    @ManyToOne
    private Costumer costumer;

    @JoinColumn(name = "product_id")
    @ManyToOne
    private Product product;

    @JoinColumn(name = "variation_id")
    @ManyToOne
    private ProductVariations variations;

    @Column(name = "order_date")
    private LocalDateTime orderDate;

    @Column(name = "delivered_date")
    private LocalDateTime deliveredDate;

    @Column(name = "order_status")
    @Enumerated(EnumType.STRING)
    private OrderStatus orderStatus;

    @Column(name = "return_status")
    @Enumerated(EnumType.STRING)
    private OrderReturnStatus returnStatus;

}
