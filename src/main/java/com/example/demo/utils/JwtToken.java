package com.example.demo.utils;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;

public class JwtToken {
    
    public static String extractToken (HttpServletRequest request) {
        String token = null;
        
        Cookie[] cookies = request.getCookies();

        if(cookies == null) {
            return null;
        }

        for (Cookie c : cookies) {
            if(c.getName().equals("jwt-token")) {
                token = c.getValue();
            }
        }
        
        return token;
    } 

}
