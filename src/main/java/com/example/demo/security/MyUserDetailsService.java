package com.example.demo.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.demo.entity.Costumer;
import com.example.demo.repository.Costumer_Repository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    Costumer_Repository costumer_repo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Costumer costumer = costumer_repo.findByEmail(username);

        if(costumer == null) {
            throw new UsernameNotFoundException(username.concat(" is missing"));
        }
        
        return new MyUserDetails(costumer);
    }
}
