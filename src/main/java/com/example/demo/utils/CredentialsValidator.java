package com.example.demo.utils;

import java.util.regex.Pattern;

import org.springframework.stereotype.Component;

@Component
public class CredentialsValidator {


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
    }

    public void validatePassword(String password) {
        if(password.length() < 6) {
            throw new IllegalArgumentException("password super short buddy");
        }
    }



}
