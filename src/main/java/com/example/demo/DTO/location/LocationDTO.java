package com.example.demo.DTO.location;

import com.example.demo.DTO.costumerDTO.AddressDTO;
import com.example.demo.entity.User_Location;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationDTO {
    private String street;
    private String city;
    private String province;
    private String country;
    private String postcode;
    private double lat;
    private double lon;
    private AddressDTO address;

    public User_Location toLocation () {
        User_Location location = new User_Location();
        location.setStreet(street);
        location.setCity(city);
        location.setProvince(province);
        location.setCountry(country);
        location.setLat(lat);
        location.setLon(lon);

        return location;
    }
}
