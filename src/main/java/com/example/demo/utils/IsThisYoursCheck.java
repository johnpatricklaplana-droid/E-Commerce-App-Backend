package com.example.demo.utils;

import org.springframework.stereotype.Service;

import com.example.demo.entity.CartItems;
import com.example.demo.entity.CostumersCart;
import com.example.demo.exceptions.ActionNotAllowedException;
import com.example.demo.repository.CartItemsRepository;
import com.example.demo.repository.CosumersCartRepository;

@Service
public class IsThisYoursCheck {
    
    public static CartItems isCartItemYours (int costumerId, int cartItemId, CartItemsRepository cartItemsRepo, CosumersCartRepository cosumersCartRepo) {

        CostumersCart cart = cosumersCartRepo.getActiveCart(costumerId);

        if(cart == null) {
            throw new IllegalArgumentException("this happens when user trys to delete cart item but don't have a active cart maybe using postman or whatever this won't happen if you just use our UI");
        }

        CartItems cartItems = cartItemsRepo.findByIdAndCart_Id(cartItemId, cart.getId());

        if(cartItems == null) {
            throw new ActionNotAllowedException("??, this is not yours buddy!!!!!!");
        }

        return cartItems;

    }

}
