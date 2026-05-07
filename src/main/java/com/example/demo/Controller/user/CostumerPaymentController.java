package com.example.demo.Controller.user;

import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

@RestController
public class CostumerPaymentController {
    
    private Integer amount = 1000;
    private String currency = "usd";

    @PostMapping("/api/public/payment")
    public ResponseEntity<Map<String, Object>> postMethodName() throws StripeException {
        
        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);
        params.put("currency", currency);
        
        Map<String, Object> auto = new HashMap<>();
        auto.put("enabled", true);
        auto.put("allow_redirects", "never");

        params.put("automatic_payment_methods", auto);

        PaymentIntent intent = PaymentIntent.create(params);

        Map<String, Object> response = new HashMap<>();
        response.put("clientsecret", intent.getClientSecret());
        response.put("id", intent.getId());
        
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(response);
    }

}
