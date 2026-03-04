package com.example.demo.Service;

import java.security.Key;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.jsonwebtoken.security.Keys;

@Service
public class JwtService {
    
    @Value("${jwt.secret}")
    private String SECRET_KEY;

    private Key getSigningKey () {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }
   
    private String generateToken (String userId) {
       return "null";
    }

}
