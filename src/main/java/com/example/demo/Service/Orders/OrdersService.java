package com.example.demo.Service.Orders;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.orders.RequestOrdersDTO;
import com.example.demo.entity.Costumer;
import com.example.demo.entity.Orders;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductVariations;
import com.example.demo.enums.OrderReturnStatus;
import com.example.demo.enums.OrderStatus;
import com.example.demo.exceptions.ActionNotAllowedException;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ProductVariationRepository;
import com.example.demo.utils.ExtractUserId;

import jakarta.persistence.EntityManager;

@Service
public class OrdersService {

    @Autowired
    OrdersRepository ordersRepo;

    @Autowired
    EntityManager entityManager;

    @Autowired
    ProductRepository productRepo;

    @Autowired
    ProductVariationRepository variationRepo;
    
    public void saveOrders (Set<RequestOrdersDTO> ordersDTO) {

        int costumerId = ExtractUserId.extractUserId();

        Set<Integer> variationIds = ordersDTO.stream()
            .map(order -> order.getVariationId())
            .collect(Collectors.toSet());

        Set<Integer> productIds = ordersDTO.stream()
            .map(prod -> prod.getProductId())
            .collect(Collectors.toSet());

        Set<ProductVariations> variations = variationRepo.findByProductAndVariations(variationIds, productIds);

        if(variations == null || variations.isEmpty()) {
            throw new ActionNotAllowedException("unable to do some");
        }

        Set<Orders> orders = new HashSet<>();
        for (ProductVariations varys : variations) {

            int productId = varys.getProduct().getId();
            int variationId = varys.getId();

            Orders order = new Orders();
            order.setCostumer(entityManager.getReference(Costumer.class, costumerId));
            order.setProduct(entityManager.getReference(Product.class, productId));
            order.setVariations(entityManager.getReference(ProductVariations.class, variationId));
            order.setOrderDate(LocalDateTime.now());
            order.setOrderStatus(OrderStatus.PROCESSING);
            orders.add(order);
        }

        ordersRepo.saveAll(orders);
        
    }

    

}
