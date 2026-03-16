package com.example.demo.entity;

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

@Entity
@Table(name = "seller_paper_storage")
@NoArgsConstructor
@Setter
@Getter
public class Seller_Paper_Storage {

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Integer id;

    @JoinColumn(name = "seller_paper_id")
    @ManyToOne
    private Sellers_Papers seller_paper_id;

    @JoinColumn(name = "admin_id")
    @ManyToOne
    private Admin admin;
    
}