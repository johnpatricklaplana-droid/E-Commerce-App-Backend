package com.example.demo.DTO.sellerDTO;

import com.example.demo.entity.Seller;
import com.example.demo.entity.User_Location;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerSignUpFieldsDTO {
    
    // Seller
    private String first_name;
    private String last_name;
    private String email;
    private String password;

    // Sellers location
    private String street;
    private String city;
    private String province;
    private String postcode;
    private String country;

    public Seller toSeller () {
        Seller seller = new Seller();
        seller.setFirst_name(first_name);
        seller.setLast_name(last_name);
        seller.setEmail(email);
        seller.setPassword(password);

        return seller;
    }

    public User_Location toSellerLocation () {
        User_Location location = new User_Location();
        location.setStreet(street);
        location.setCity(city);
        location.setProvince(province);
        location.setPostal_code(postcode);
        location.setCountry(country);

        return location;
    }
}
