package com.example.demo.utils;

import org.springframework.security.core.context.SecurityContextHolder;

import com.example.demo.security.MyUserDetails;

public class ExtractUserId {
    
    public static int extractUserId() {
        
        MyUserDetails userDetails = (MyUserDetails) SecurityContextHolder
            .getContext()
            .getAuthentication()
            .getPrincipal();

        return userDetails.getUserId();
    }

}
