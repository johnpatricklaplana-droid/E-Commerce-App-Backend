package com.example.demo.Service.user;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.jspecify.annotations.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.demo.DTO.costumerDTO.CartItemsDTO;
import com.example.demo.DTO.location.LocationDTO;
import com.example.demo.DTO.orders.RequestOrdersDTO;
import com.example.demo.DTO.productDTO.ProductResponse;
import com.example.demo.Mapper.CartItemsClean;
import com.example.demo.Mapper.ProductMapper;
import com.example.demo.entity.CartItems;
import com.example.demo.entity.Costumer;
import com.example.demo.entity.CostumersCart;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductVariations;
import com.example.demo.entity.User_Location;
import com.example.demo.enums.CartStatus;
import com.example.demo.exceptions.ActionNotAllowedException;
import com.example.demo.repository.CartItemsRepository;
import com.example.demo.repository.CostumerRepository;
import com.example.demo.repository.CosumersCartRepository;
import com.example.demo.security.MyUserDetails;
import com.example.demo.utils.ExtractUserId;
import com.example.demo.utils.IsThisYoursCheck;

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
    public String addToCart(int productId, int variantId, int quantity) {
        
        if(quantity <= 0) {
            throw new IllegalArgumentException("quantity must be greater than 0");
        }

        int costumerId = ExtractUserId.extractUserId();

        CostumersCart activeCart = cosumersCartRepo.getActiveCart(costumerId);

        if(activeCart == null) {
            CostumersCart cart = new CostumersCart();
            cart.setCostumer(entityManager.getReference(Costumer.class, costumerId));
            cart.setStatus(CartStatus.ACTIVE);
            cosumersCartRepo.save(cart);
            activeCart = cart;
        }

        CartItems cartItemsIfAlreadyExist = cartItemsRepo.findByCart_IdAndVariations_Id(activeCart.getId(), variantId);
        
        if(cartItemsIfAlreadyExist != null) {
            cartItemsIfAlreadyExist.setQuantity(cartItemsIfAlreadyExist.getQuantity() + 1);
            cartItemsRepo.save(cartItemsIfAlreadyExist);

            return "quantity updated";
        }

        CartItems cartItems = new CartItems();
        cartItems.setCart(activeCart);
        cartItems.setProduct(entityManager.getReference(Product.class, productId));
        cartItems.setAddedDate(LocalDateTime.now());
        cartItems.setQuantity(quantity);
        cartItems.setVariations(entityManager.getReference(ProductVariations.class, variantId));
        cartItemsRepo.save(cartItems);
 
        return "added to cart";       

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

    public int getCartItemsCount() {
        
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        int costumerId = userDetails.getUserId();

        CostumersCart activeCart = cosumersCartRepo.getActiveCart(costumerId);

        int itemsCount = cartItemsRepo.getCartItemsCount(activeCart.getId());

        return itemsCount;
    }

    public void updateCartItemQuantity(int cartItemId, int quantity) {
            
        int costumerId = ExtractUserId.extractUserId();

        CostumersCart cart = cosumersCartRepo.getActiveCart(costumerId);

        CartItems cartItems = cartItemsRepo.findByIdAndCart_Id(cartItemId, cart.getId());

        if(cartItems == null) {
            throw new ActionNotAllowedException("forbidden");
        }

        // TODO: LIMIT QUANTITY

        if(quantity <= 0) {
            throw new IllegalArgumentException("entity must be greater than 0!!!!!!!!!");
        }

        cartItems.setQuantity(quantity);
        cartItemsRepo.save(cartItems);

    }

    public void deleteCartItem(int cartItemId) {
        
        int costumerId = ExtractUserId.extractUserId();

        CartItems cartItem = IsThisYoursCheck.isCartItemYours(costumerId, cartItemId, cartItemsRepo, cosumersCartRepo);

        cartItemsRepo.delete(cartItem);

    }

    public Set<CartItemsDTO> getItemsToPlaceOrder (RequestOrdersDTO cartItemsIdsDto) {

        Set<Integer> cartItemsIds = cartItemsIdsDto.getCartItemId();

        Integer costumerId = ExtractUserId.extractUserId();

        CostumersCart cart = cosumersCartRepo.getActiveCart(costumerId);

        Set<CartItems> cartItems = cartItemsRepo.findCartItemsByIds(cartItemsIds, cart.getId());

        Set<Integer> cartItemsIdsRealOne = cartItems
            .stream()
            .map(cartItem -> cartItem.getId())
            .collect(Collectors.toSet());
            

        Set<CartItems> cartItemsFullyLoaded = cartItemsRepo.getItemsToPlaceOrder(cartItemsIdsRealOne);

        return cartItemsClean.cleanCaritItems(cartItemsFullyLoaded);

    }

    public LocationDTO getUserLocation() {
        
        int costumerId = ExtractUserId.extractUserId();

        Costumer costumer = costumer_Repo.findById(costumerId).orElse(null);

        User_Location location = costumer.getCostumer_location().get(0);

        LocationDTO locationDTO = new LocationDTO();
        locationDTO.setCity(location.getCity());
        locationDTO.setCountry(location.getCountry());
        locationDTO.setPostcode(location.getPostal_code());
        locationDTO.setProvince(location.getProvince());
        locationDTO.setStreet(location.getStreet());
        
        return locationDTO;
    }

}
