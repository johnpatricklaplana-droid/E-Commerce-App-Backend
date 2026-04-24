package com.example.demo.Service.user;

import java.time.LocalDateTime;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.DTO.costumerDTO.CartItemsDTO;
import com.example.demo.DTO.productDTO.ProductResponse;
import com.example.demo.Mapper.CartItemsClean;
import com.example.demo.Mapper.ProductMapper;
import com.example.demo.entity.CartItems;
import com.example.demo.entity.Costumer;
import com.example.demo.entity.CostumersCart;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductVariations;
import com.example.demo.enums.CartStatus;
import com.example.demo.repository.CartItemsRepository;
import com.example.demo.repository.CostumerRepository;
import com.example.demo.repository.CosumersCartRepository;
import com.example.demo.security.MyUserDetails;

import jakarta.persistence.EntityManager;

@Service
public class CostumerService {

    @Autowired
    CostumerRepository costumer_Repo;

    @Autowired
    ProductMapper productMapper;

    @Autowired
    CosumersCartRepository cosumersCartRepo;

    @Autowired
    EntityManager entityManager;

    @Autowired
    CartItemsRepository cartItemsRepo;

    @Autowired
    CartItemsClean cartItemsClean;

    public Set<ProductResponse> getProducts(String category) {
        
        if(category.equals("all")) {
            category = null;
        }

        Set<Product> product = costumer_Repo.getProductsFilterBy(category);
        product.forEach(prod -> prod.setVariations(null));
   
        return productMapper.toProductResponse(product);
    }

    @Transactional
    public void addToCart(int productId, int variantId, int quantity) {
        
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        int costumerId = userDetails.getUserId();

        CostumersCart activeCart = cosumersCartRepo.getActiveCart(costumerId);

        if(activeCart == null) {
            CostumersCart cart = new CostumersCart();
            cart.setCostumer(entityManager.getReference(Costumer.class, costumerId));
            cart.setStatus(CartStatus.ACTIVE);
            cosumersCartRepo.save(cart);
            activeCart = cart;
        }

        CartItems cartItems = new CartItems();
        cartItems.setCart(activeCart);
        cartItems.setProduct(entityManager.getReference(Product.class, productId));
        cartItems.setAddedDate(LocalDateTime.now());
        cartItems.setQuantity(quantity);
        cartItems.setVariations(entityManager.getReference(ProductVariations.class, variantId));
        cartItemsRepo.save(cartItems);

    }

    public Set<CartItemsDTO> getActiveCart() {
        
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        int costumerId = userDetails.getUserId();
  
        CostumersCart activeCart = cosumersCartRepo.getActiveCart(costumerId);
        
        Set<CartItems> cartItems = cartItemsRepo.getCartItems(activeCart.getId());

        return cartItemsClean.cleanCaritItems(cartItems);

    }
}
