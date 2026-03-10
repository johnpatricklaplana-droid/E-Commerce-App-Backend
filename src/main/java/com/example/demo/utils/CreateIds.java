package com.example.demo.utils;

import com.example.demo.entity.User_Location;

public class CreateIds {
    
    public static String createLocationId (User_Location location) {

        String country = location.getCountry();
        String city = location.getCity();
        String province = location.getProvince();
        String postalCode = location.getPostal_code();
        String street = location.getStreet();

        return country + city + province + postalCode + street;
    }

}
