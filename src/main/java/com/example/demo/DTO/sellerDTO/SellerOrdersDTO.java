package com.example.demo.DTO.sellerDTO;

import java.time.LocalDateTime;

import com.example.demo.DTO.costumerDTO.CostumerDTO;
import com.example.demo.DTO.location.LocationDTO;
import com.example.demo.DTO.productDTO.ProductDTO;
import com.example.demo.DTO.productDTO.ProductVariationsDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerOrdersDTO {

    private int orderId;

    private CostumerDTO costumer;

    private ProductDTO product;
    private ProductVariationsDTO variations;

    private LocalDateTime orderDate;
    private String orderStatus;

    private String returnStatus;

    private String paymentStatus;

    private LocationDTO location;

}
