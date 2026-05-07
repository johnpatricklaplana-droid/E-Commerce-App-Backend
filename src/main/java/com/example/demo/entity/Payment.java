package com.example.demo.entity;

import java.time.LocalDateTime;

import com.example.demo.enums.PaymentStatus;

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

@Table(name = "payment")
@Entity
@Getter
@Setter
@NoArgsConstructor
public class Payment {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @JoinColumn(name = "seller_id")
    @ManyToOne
    private Seller seller;

    @JoinColumn(name = "costumer_id")
    @ManyToOne
    private Costumer costumer;

    @Column(name = "amount")
    private double amount;

    @Column(name = "stripe_payment_intent_id")
    private String stripePaymentIntentId;

    @Column(name = "currency")
    private double currency;

    @Column(name = "status")
    private PaymentStatus status;

    @Column(name = "stripe_charge_id")
    private String stripeChargeId;

    @Column(name = "refund_amount")
    private double refundAmount;

    @Column(name = "refunded_at")
    private LocalDateTime refundedAt;

    @JoinColumn(name = "payment_method")
    @ManyToOne
    private PaymentMethod paymentMethod;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

}
