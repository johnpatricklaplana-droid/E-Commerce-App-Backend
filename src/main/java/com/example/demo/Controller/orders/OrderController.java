package com.example.demo.Controller.orders;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResponseDTO.SimpleResponseDTO;
import com.example.demo.DTO.costumerDTO.CostumerOrdersDTO;
import com.example.demo.DTO.orders.RequestOrdersDTO;
import com.example.demo.Service.Orders.OrdersService;
import com.stripe.exception.StripeException;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;



@RestController
public class OrderController {

    @Autowired
    OrdersService ordersService;
    
    @PostMapping("/api/costumer/orders")
    public Map<String, Object> saveOrders(@RequestBody RequestOrdersDTO order) throws StripeException {
        String clientSecret = ordersService.saveOrders(order);

        Map<String, Object> response = new HashMap<>();
        response.put("client_secret", clientSecret);

        return response;
    }

    @GetMapping("/api/costumer/orders")
    public ResponseEntity<List<CostumerOrdersDTO>> getCostumerOrders() {
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(ordersService.getCostumerOrders());
    }
    
    
}
