package com.example.demo.Mapper;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.DTO.costumerDTO.CartItemsDTO;
import com.example.demo.DTO.location.LocationDTO;
import com.example.demo.DTO.productDTO.ProductDTO;
import com.example.demo.DTO.productDTO.ProductVariationsDTO;
import com.example.demo.DTO.sellerDTO.SellerDTO;
import com.example.demo.entity.CartItems;
import com.example.demo.entity.Product;
import com.example.demo.entity.ProductImage;
import com.example.demo.entity.ProductVariations;
import com.example.demo.entity.Seller;
import com.example.demo.entity.User_Location;

@Service
public class CartItemsClean {
    
    public CartItemsDTO cleanCaritItems (CartItems cartItems) {

        CartItemsDTO cartItemsDTO = new CartItemsDTO();
        cartItemsDTO.setCartId(cartItems.getId());
        cartItemsDTO.setAddedDate(cartItems.getAddedDate());
        cartItemsDTO.setQuantity(cartItems.getQuantity());    

        Product product = cartItems.getProduct();
        ProductDTO productDTO = new ProductDTO();
        productDTO.setProductId(product.getId());
        productDTO.setProductName(product.getProductName());
        productDTO.setThumbnail(product.getThumbnail());
        productDTO.setProductDescription(product.getProductDescription());
        cartItemsDTO.setProduct(productDTO);

        ProductVariations variations = cartItems.getVariations();
        ProductVariationsDTO variationsDTO = new ProductVariationsDTO();
        variationsDTO.setVariantId(variations.getId());
        variationsDTO.setVariationName(variations.getVariationName());
        variationsDTO.setPrice(variations.getPrice());
        variationsDTO.setColor(variations.getColor());
        variationsDTO.setSku(variations.getSku());
        
        Set<ProductImage> productImage = variations.getImages();
        Set<String> productImagesDTO = productImage.stream()
            .map(img -> img.getImageUrl())
            .collect(Collectors.toSet());
        
        variationsDTO.setImagesUrl(productImagesDTO);
        
        cartItemsDTO.setVariations(variationsDTO);

        SellerDTO sellerDTO = new SellerDTO();
        Seller seller = product.getSeller();
        sellerDTO.setFirstName(seller.getFirst_name());
        sellerDTO.setLastName(seller.getLast_name());
        sellerDTO.setProfilePic(seller.getProfile_pic());
        sellerDTO.setSellerId(seller.getId());

        cartItemsDTO.setSeller(sellerDTO);

        Set<User_Location> location = seller.getSeller_location();
        Set<LocationDTO> locationDTO = location.stream()
            .map(loc -> {
                LocationDTO dto = new LocationDTO();
                dto.setCity(loc.getCity());
                dto.setCountry(loc.getCountry());
                dto.setLat(loc.getLat());
                dto.setLon(loc.getLon());
                dto.setPostcode(loc.getPostal_code());
                dto.setProvince(loc.getProvince());
                dto.setStreet(loc.getStreet());

                return dto;
            })
            .collect(Collectors.toSet());

        cartItemsDTO.setLocation(locationDTO);

        return cartItemsDTO;
        
    }

    public Set<CartItemsDTO> cleanCaritItems (Set<CartItems> cartItems) {
      
        return cartItems.stream()
            .map(cart -> cleanCaritItems(cart))
            .collect(Collectors.toSet());

    }

}
