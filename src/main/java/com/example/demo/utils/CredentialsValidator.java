package com.example.demo.utils;

import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.demo.exceptions.EmailAlreadyExistException;
import com.example.demo.repository.Costumer_Repository;

@Component
public class CredentialsValidator {

    @Autowired
    private Costumer_Repository costumer_repository;

    public boolean isValidEmail(String email) {
        String emailRegex = "^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$";
        Pattern pat = Pattern.compile(emailRegex);
        if (email == null)
            return false;
        return pat.matcher(email).matches();
    }

    public void validateEmail (String email) {
        if(!isValidEmail(email)) {
            throw new IllegalArgumentException("Invalid email");
        }

        boolean emailExist = costumer_repository.existsByEmail(email);

        if(emailExist) {
            throw new EmailAlreadyExistException("Email already exist buddy");
        }
    }

    public void validatePassword(String password) {
        if(password.length() < 6) {
            throw new IllegalArgumentException("password super short buddy");
        }
    }



}
