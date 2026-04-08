package com.example.demo.Service.user;

import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;

import com.example.demo.Service.Jwt;
import com.example.demo.entity.User;
import com.example.demo.security.MyUserDetails;
import com.example.demo.utils.CredentialsValidator;

@Service
public class UserAuthService {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private Jwt jwt;

    @Autowired
    private CredentialsValidator credentialsValidator;

    public String login (User user) {
          
        credentialsValidator.validateEmail(user.getEmail());
        credentialsValidator.validatePassword(user.getPassword());
         
        Authentication authentication = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );
        
        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();

        Set<String> roles = userDetails.getAuthorities()
                                    .stream()
                                    .map(GrantedAuthority::getAuthority)
                                    .collect(Collectors.toSet());

        String userId = userDetails.getUserId().toString();

        return jwt.generateToken(userId, roles);

    }

}
