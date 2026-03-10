package com.example.demo.Service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.DTO.userDTO.costumerAndLocationDTO;
import com.example.demo.entity.Costumer;
import com.example.demo.entity.User_Location;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.repository.Costumer_Repository;
import com.example.demo.repository.User_LocationRepository;
import com.example.demo.utils.CreateIds;
import com.example.demo.utils.CredentialsValidator;

@Service
public class SignupService {

    @Autowired
    private Costumer_Repository costumer_repository;

    @Autowired
    private User_LocationRepository location_repository;

    @Autowired
    private CredentialsValidator credentialsValidator;

    public void signup(costumerAndLocationDTO requestBody) {
        
        Costumer costumer = requestBody.getCostumer();
        User_Location location = requestBody.getLocation();

        // get credentials
        String email = costumer.getEmail();
        String password = costumer.getPassword();
        String confirm_password = requestBody.getConfirm_password();

        // validate email and password
        credentialsValidator.validateEmail(email);
        credentialsValidator.validatePassword(password, confirm_password);
          
        // create location id
        String location_id = CreateIds.createLocationId(location);

        // find if location exist
        boolean locExist = location_repository.existsById(location_id);
        
        if(!locExist) {
            throw new ResourceNotFoundException("location not found");
        }
        
        List<User_Location> userLoc = new ArrayList<>();
        location.setId(location_id);
        userLoc.add(location);
     
        costumer.setCostumer_location(userLoc);
       
        costumer_repository.save(costumer);
        
    }
    
}
