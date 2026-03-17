package com.example.demo.DTO.sellerDTO;

import com.example.demo.entity.Business_Registration_Documents;
import com.example.demo.entity.Seller;
import com.example.demo.entity.Seller_Bank_Account;
import com.example.demo.entity.Sellers_Papers;
import com.example.demo.entity.User_Location;
import com.example.demo.enums.Bank_Account_status;

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

    // Sellers Bank account
    private String bank_account_number;
    private String account_type;

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
        seller.setProfile_pic_image_path(profile_pic_image_path);

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

    public Seller_Bank_Account toSellerBank_Account () {
        Seller_Bank_Account seller_Bank_Account = new Seller_Bank_Account();
        seller_Bank_Account.setBank_account_number(bank_account_number);
        seller_Bank_Account.setAccount_type(account_type);
        seller_Bank_Account.setStatus(Bank_Account_status.ACTIVE);

        return seller_Bank_Account;
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
