package com.example.demo.entity;

import java.time.LocalDateTime;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "cart_items")
@Entity
@Setter
@Getter
@NoArgsConstructor
public class CartItems {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "cart_id")
    @ManyToOne
    private CostumersCart cart;

    @JoinColumn(name = "product_id")
    @ManyToOne
    private Product product;

    @Column(name = "added_date")
    private LocalDateTime addedDate;

    @Column(name = "quantity")
    private Integer quantity;

    @JoinColumn(name = "variation_id")
    @ManyToOne
    private ProductVariations variations;

}
