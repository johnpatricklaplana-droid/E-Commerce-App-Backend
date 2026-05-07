package com.example.demo.Controller.payment;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.payment.PaymentService;
import com.example.demo.entity.PaymentMethod;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;


@RestController
public class PaymentController {

    @Autowired
    PaymentService paymentService;
    
    @GetMapping("/api/costumer/payment-method")
    public ResponseEntity<List<PaymentMethod>> getMethodName() {
               
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(paymentService.getPaymentMethod());
    }

}
