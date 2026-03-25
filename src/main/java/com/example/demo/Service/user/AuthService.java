package com.example.demo.Service.user;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.demo.Controller.client.Location_external_API;
import com.example.demo.DTO.costumerDTO.costumer_InfoDTO;
import com.example.demo.DTO.location.LocationDTO;
import com.example.demo.Service.Jwt;
import com.example.demo.entity.Costumer;
import com.example.demo.entity.User_Location;
import com.example.demo.enums.User_Role;
import com.example.demo.exceptions.EmailAlreadyExistException;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.exceptions.UnAuthorizedException;
import com.example.demo.repository.Costumer_Repository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.User_LocationRepository;
import com.example.demo.utils.CredentialsValidator;

@Service
public class AuthService {

    @Autowired
    private Costumer_Repository costumer_repository;

    @Autowired
    private User_LocationRepository location_repository;

    @Autowired
    private CredentialsValidator credentialsValidator;

    @Autowired
    private UserRepository user_repo;

    @Autowired
    private Jwt jwt;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void signup(costumer_InfoDTO requestBody) {
        
        Costumer costumer = requestBody.getCostumer();
        costumer.setRole(User_Role.ROLE_COSTUMER);
        costumer.setPassword(passwordEncoder.encode(requestBody.getPassword()));
        User_Location location = requestBody.getLocation();

        List<LocationDTO> body = Location_external_API.getUserLocation(location);

        if(body.isEmpty()) {
            throw new ResourceNotFoundException("Location not found make sure your not messing around");
        }
       
        for (LocationDTO costumer_location : body) {
            location.setRegion(costumer_location.getAddress().getRegion());
            location.setLat(costumer_location.getLat());
            location.setLon(costumer_location.getLon());
        }

        String email = costumer.getEmail();
        String password = costumer.getPassword();

        credentialsValidator.validateEmail(email);
        credentialsValidator.validatePassword(password);

        boolean emailExist = user_repo.existsByEmail(email);

        if(emailExist) {
            throw new EmailAlreadyExistException(
                "email con only be use once to create account for some reason"
            );
        }
        
        List<User_Location> userLoc = new ArrayList<>();
        userLoc.add(location);
     
        costumer.setCostumer_location(userLoc);
       
        location_repository.save(location);
        costumer_repository.save(costumer);
        
    }

    public String validateJwtToken (String token) {

       if(token == null) {
            return token;
       }

       boolean isit = jwt.isTokenValid(token);

       if(!isit) {
            throw new UnAuthorizedException("Unauthorized");
       }

        return token;
    }
    
}
