package com.example.demo.DTO.costumerDTO;

import java.time.LocalDateTime;

import com.example.demo.DTO.productDTO.ProductDTO;
import com.example.demo.DTO.productDTO.ProductVariationsDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CostumerOrdersDTO {
    
    private int orderId;
    private LocalDateTime orderDate;

    private ProductVariationsDTO variationsDTO;

    private ProductDTO productDTO;

    private LocalDateTime deliveredDate;
    private String orderStatus;
    private int quantity;
    
}
