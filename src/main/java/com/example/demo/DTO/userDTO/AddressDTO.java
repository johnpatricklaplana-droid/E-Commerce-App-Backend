package com.example.demo.DTO.userDTO;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddressDTO {
    private String city;
    private String state;
    private String region;
    private String postcode;
    private String country;
}
