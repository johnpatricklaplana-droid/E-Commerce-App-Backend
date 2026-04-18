package com.example.demo.DTO.sellerDTO;

import lombok.Setter;

import java.util.List;
import java.util.Set;

import com.example.demo.DTO.location.LocationDTO;

import lombok.Getter;

@Getter
@Setter
public class SellerInfo {
    
    private int sellerId;
    private String firstName;
    private String lastName;
    private String profilePic;

    private Set<RatingsDTO> ratings;

    private Set<LocationDTO> location;

}
