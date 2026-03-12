package com.example.demo.DTO.userDTO;

import com.example.demo.entity.Costumer;
import com.example.demo.entity.User_Location;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class costumerAndLocationDTO {
  
    // Costumer
    private String first_name;
    private String last_name;
    private String profile_pic;
    private String email;
    private String password;

    // Location
    private String street;
    private String city;
    private String province;
    private String country;
    private String postcode;
    private double lat;
    private double lon;
    private AddressDTO address;

    public Costumer getCostumer () {
        Costumer costumer = new Costumer();
        costumer.setFirst_name(first_name);
        costumer.setLast_name(last_name);
        costumer.setProfile_pic(profile_pic);
        costumer.setEmail(email);
        costumer.setPassword(password);

        return costumer;
    }

    public User_Location getLocation () {
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
