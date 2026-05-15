package com.example.demo.DTO.sellerDTO;

import java.util.Set;

import com.example.demo.DTO.location.LocationDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SellerInfoPrivate {
    private int sellerId;
    private String firstName;
    private String lastName;
    private String profilePic;
    private String email;
    private String phoneNumber; 

    private double ratings;

    private Set<LocationDTO> location;
}
