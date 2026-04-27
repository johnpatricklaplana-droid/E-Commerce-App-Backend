package com.example.demo.repository;

import java.util.Set;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.CartItems;

public interface CartItemsRepository extends JpaRepository<CartItems, Integer> {

    @Query("""
        SELECT ci
        FROM CartItems ci
        JOIN FETCH ci.product as p
        LEFT JOIN FETCH p.ratings
        JOIN FETCH p.seller as s
        JOIN FETCH s.seller_location
        JOIN FETCH ci.variations as v
        JOIN FETCH v.images 
        WHERE ci.cart.id = :cartId
    """)
    Set<CartItems> getCartItems(@Param("cartId") Integer cartId);

    @Query("""
        SELECT COUNT(ci)
        FROM CartItems ci
        WHERE ci.cart.id = :cartId
    """)
    int getCartItemsCount(@Param("cartId") int cartId);

    CartItems findByIdAndCart_Id(int cartItemId, Integer id);

    CartItems findByCart_IdAndVariations_Id(Integer id, int variantId);
    
}
