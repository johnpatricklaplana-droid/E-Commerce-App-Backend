package com.example.demo.Controller.orders;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResponseDTO.SimpleResponseDTO;
import com.example.demo.DTO.orders.RequestOrdersDTO;
import com.example.demo.Service.Orders.OrdersService;
import com.stripe.exception.StripeException;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


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
    
}
