package com.example.demo.Service.seller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.sellerDTO.SellerInfoDTO;
import com.example.demo.entity.Seller;
import com.example.demo.entity.Seller_Bank_Account;
import com.example.demo.entity.Sellers_Papers;
import com.example.demo.entity.User_Location;
import com.example.demo.repository.Seller_Repository;
import com.example.demo.utils.CredentialsValidator;

@Service
public class SellerAuthService {
    
    @Autowired
    Seller_Repository seller_Repo;

    @Autowired
    CredentialsValidator credentialsValidator;

    public void signup (SellerInfoDTO seller_info) {
        
        Seller seller = seller_info.toSeller();
        Sellers_Papers sellers_Papers = seller_info.toSellers_Papers();
        Seller_Bank_Account seller_Bank_Account = seller_info.toSellerBank_Account();
        User_Location location = seller_info.toSellerLocation();

        String email = seller.getEmail();
        String password  = seller.getPassword();

        credentialsValidator.validateEmail(email);
        credentialsValidator.validatePassword(password);

    }

}
