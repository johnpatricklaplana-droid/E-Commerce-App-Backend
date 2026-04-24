package com.example.demo.entity;

import com.example.demo.enums.CartStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.EnumeratedValue;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Table(name = "costumers_cart")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class CostumersCart {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "costumer_id")
    @ManyToOne
    private Costumer costumer;

    @Column(name = "status")
    @Enumerated(EnumType.STRING)
    private CartStatus status;

}
