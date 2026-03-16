package com.example.demo.Controller.client;

import java.util.List;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.web.reactive.function.client.WebClient;

import com.example.demo.DTO.location.LocationDTO;
import com.example.demo.entity.User_Location;

import reactor.core.publisher.Mono;

public class Location_external_API {

    public static List<LocationDTO> getUserLocation(User_Location location) {
        WebClient webClient = WebClient.create();
        
        List<LocationDTO> body = webClient.get()
            .uri("https://nominatim.openstreetmap.org/search?city=" + location.getCity() + "&postcode=" + location.getPostal_code() + "&state=" + location.getProvince() + "&country=" + location.getCountry() + "&format=json&limit=1&addressdetails=1")
            .header("User-Agent", "E-Commerce-App/1.0 (johnyjohnyheydaddy@gmail.com)")
            .exchangeToMono(resp -> {
                if(resp.statusCode().isError()) {
                    return resp.createException().flatMap(Mono::error);
                } 
                return resp.bodyToMono(
                    new ParameterizedTypeReference<List<LocationDTO>>() {}
                );
            })
            .block();

        return body;
    }
    
}
