package com.example.demo.Controller.orders;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.DTO.ResponseDTO.SimpleResponseDTO;
import com.example.demo.DTO.orders.RequestOrdersDTO;
import com.example.demo.Service.Orders.OrdersService;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class OrderController {

    @Autowired
    OrdersService ordersService;
    
    @PostMapping("/api/costumer/orders")
    public ResponseEntity<SimpleResponseDTO> postMethodName(@RequestBody Set<RequestOrdersDTO> order) {
        ordersService.saveOrders(order);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(new SimpleResponseDTO("created one", 201));
    }
    
}
