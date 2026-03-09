package com.example.demo.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Costumer;
import com.example.demo.repository.Costumer_Repository;
import com.example.demo.repository.User_LocationRepository;
import com.example.demo.utils.EmailValidator;

@Service
public class SignupService {

    @Autowired
    Costumer_Repository costumer_repository;

    @Autowired
    User_LocationRepository location_repository;

    public void signup(Costumer costumer) {
        
        String emailInput = costumer.getEmail();
        String passwordInput = costumer.getPassword();

        if(!EmailValidator.isValidEmail(emailInput)) {
            throw new IllegalArgumentException("Invalid email");
        }

        if(passwordInput.length() < 6) {
            throw new IllegalArgumentException("Password too short");
        }

        

    }
    
}
