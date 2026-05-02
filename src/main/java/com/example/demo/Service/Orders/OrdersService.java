package com.example.demo.Service.Orders;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.DTO.orders.RequestOrdersDTO;
import com.example.demo.entity.CartItems;
import com.example.demo.entity.Costumer;
import com.example.demo.entity.CostumersCart;
import com.example.demo.entity.Orders;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductVariations;
import com.example.demo.enums.OrderReturnStatus;
import com.example.demo.enums.OrderStatus;
import com.example.demo.exceptions.ActionNotAllowedException;
import com.example.demo.repository.CartItemsRepository;
import com.example.demo.repository.CosumersCartRepository;
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

    @Autowired
    CosumersCartRepository costumersCartRepo;

    @Autowired
    CartItemsRepository cartItemsRepo;
    
    @Transactional
    public void saveOrders (Set<RequestOrdersDTO> ordersDTO) {

        int costumerId = ExtractUserId.extractUserId();

        CostumersCart cart = costumersCartRepo.getActiveCart(costumerId);

        Set<Integer> cartItemIds = ordersDTO.stream()
                .map(ord -> ord.getCartItemId())
                .collect(Collectors.toSet());

        Set<CartItems> cartItems = cartItemsRepo.findCartItemsByIds(cartItemIds, cart.getId());     

        Set<Orders> orders = new HashSet<>();
        for (CartItems item : cartItems) {

            Orders order = new Orders();
            order.setCostumer(entityManager.getReference(Costumer.class, costumerId));
            order.setProduct(item.getProduct());
            order.setVariations(item.getVariations());
            order.setOrderDate(LocalDateTime.now());
            order.setOrderStatus(OrderStatus.PROCESSING);
            orders.add(order);
            
        }

        ordersRepo.saveAll(orders);

        cartItemsRepo.deleteAllById(cartItemIds);
        
    }

}
