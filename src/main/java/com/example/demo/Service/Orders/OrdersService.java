package com.example.demo.Service.Orders;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.DTO.costumerDTO.CostumerOrdersDTO;
import com.example.demo.DTO.orders.RequestOrdersDTO;
import com.example.demo.DTO.productDTO.ProductDTO;
import com.example.demo.DTO.productDTO.ProductVariationsDTO;
import com.example.demo.entity.CartItems;
import com.example.demo.entity.Costumer;
import com.example.demo.entity.CostumersCart;
import com.example.demo.entity.Orders;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductVariations;
import com.example.demo.enums.OrderStatus;
import com.example.demo.enums.PaymentStatusOrder;
import com.example.demo.repository.CartItemsRepository;
import com.example.demo.repository.CosumersCartRepository;
import com.example.demo.repository.OrdersRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.ProductVariationRepository;
import com.example.demo.utils.ExtractUserId;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;

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
    public String saveOrders (RequestOrdersDTO ordersDTO) throws StripeException {

        int costumerId = ExtractUserId.extractUserId();

        CostumersCart cart = costumersCartRepo.getActiveCart(costumerId);

        Set<Integer> cartItemIds = ordersDTO.getCartItemId();
        
        Set<CartItems> cartItems = cartItemsRepo.findCartItemsByIds(cartItemIds, cart.getId());     

        Long amount = (long) 0;

        Set<Orders> orders = new HashSet<>();
        for (CartItems item : cartItems) {
        
            Orders order = new Orders();
            order.setCostumer(entityManager.getReference(Costumer.class, costumerId));
            order.setProduct(item.getProduct());
            order.setVariations(item.getVariations());
            order.setOrderDate(LocalDateTime.now());
            order.setOrderStatus(OrderStatus.PENDING);
            order.setPaymentStatusOrder(PaymentStatusOrder.require_payment);
            order.setQuantity(item.getQuantity());
            orders.add(order);
            amount += Math.round(item.getVariations().getPrice() * item.getQuantity());

        }
       
        Map<String, Object> params = new HashMap<>();
        params.put("amount", amount);
        params.put("currency", "usd");

        params.put("payment_method_types", Arrays.asList("card", "amazon_pay"));

        PaymentIntent intent = PaymentIntent.create(params);

        String clientSecret = intent.getClientSecret();
        String intentId = intent.getId();

        Set<Orders> ordersFinal = orders.stream()
            .map(ord -> {
                ord.setPaymentIntentId(intentId);
                return ord;
            })
            .collect(Collectors.toSet());

        ordersRepo.saveAll(ordersFinal);

        cartItemsRepo.deleteAllById(cartItemIds);
        
        return clientSecret;

    }

    public List<CostumerOrdersDTO> getCostumerOrders() {
        
        int costumerId = ExtractUserId.extractUserId();

        List<Orders> orders = ordersRepo.findAllPaidOrders(costumerId, PaymentStatusOrder.paid);

        List<CostumerOrdersDTO> ordersDTOs = new ArrayList<>();

        for (Orders o : orders) {
            CostumerOrdersDTO dto = new CostumerOrdersDTO();
            dto.setOrderId(o.getId());
            dto.setDeliveredDate(o.getDeliveredDate());
            dto.setOrderDate(o.getOrderDate());
            dto.setOrderStatus(o.getOrderStatus().toString());

            Product prod = o.getProduct();

            ProductDTO productDTO = new ProductDTO();
            productDTO.setProductId(prod.getId());
            productDTO.setProductName(prod.getProductName());
            productDTO.setProductDescription(prod.getProductDescription());
            productDTO.setThumbnail(prod.getThumbnail());

            dto.setProductDTO(productDTO);

            ProductVariations productVar = o.getVariations();

            ProductVariationsDTO productVariationsDTO = new ProductVariationsDTO();
            productVariationsDTO.setColor(productVar.getColor());
            productVariationsDTO.setImagesUrl(productVar.getImages().stream().map(img -> img.getImageUrl()).collect(Collectors.toSet()));
            productVariationsDTO.setPrice(productVar.getPrice());
            productVariationsDTO.setVariantId(productVar.getId());
            productVariationsDTO.setVariationName(productVar.getVariationName());

            dto.setVariationsDTO(productVariationsDTO);
            dto.setQuantity(o.getQuantity());

            ordersDTOs.add(dto);
            
        }

        return ordersDTOs;

    }

}
