package com.example.demo.entity;

import com.example.demo.enums.Bank_Account_status;

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
@Table(name="seller_bank_account")
@Setter
@Getter
@NoArgsConstructor
public class Seller_Bank_Account {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(name="bank_account_number")
    private String bank_account_number;

    @Column(name="account_type")
    private String account_type;

    @Column(name="status")
    @Enumerated(EnumType.STRING)
    private Bank_Account_status status;

    @ManyToOne
    @JoinColumn(name="seller_id")
    private Seller seller;
}
