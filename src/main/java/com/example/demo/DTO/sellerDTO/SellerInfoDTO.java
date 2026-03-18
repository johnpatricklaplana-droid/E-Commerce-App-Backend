package com.example.demo.DTO.sellerDTO;

import com.example.demo.entity.Business_Registration_Documents;
import com.example.demo.entity.Seller;
import com.example.demo.entity.Sellers_Papers;
import com.example.demo.entity.User_Location;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerInfoDTO {
    
    // Seller
    private String first_name;
    private String last_name;
    private String email;
    private String password;
    private String profile_pic_image_path;

    // Sellers Paper
    private String national_id;

    // Sellers location
    private String street;
    private String city;
    private String province;
    private String postcode;
    private String country;

    // business_registration_documents 
    private String file_url;

    public Seller toSeller () {
        Seller seller = new Seller();
        seller.setFirst_name(first_name);
        seller.setLast_name(last_name);
        seller.setEmail(email);
        seller.setPassword(password);
        seller.setProfile_pic(profile_pic_image_path);

        return seller;
    }

    public Business_Registration_Documents toBusiness_Registration_Documents () {
        Business_Registration_Documents documents = new Business_Registration_Documents();
        documents.setFile_url(file_url);
        return documents;
    }

    public Sellers_Papers toSellers_Papers () {
        Sellers_Papers sellers_Papers = new Sellers_Papers();
        sellers_Papers.setNational_id(national_id);

        return sellers_Papers;
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
