package com.example.demo.Service.payment;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.PaymentMethod;
import com.example.demo.repository.PaymentMethodRepository;

@Service
public class PaymentService {

    @Autowired
    PaymentMethodRepository paymentMethodRepo;
    
    public List<PaymentMethod> getPaymentMethod () {

        return paymentMethodRepo.findAll();
        
    }

}
