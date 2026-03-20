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
import com.example.demo.enums.User_Role;
import com.example.demo.exceptions.UnAuthorizedException;
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

    public String login (User user, User_Role role) {
          
        credentialsValidator.validateEmail(user.getEmail());
        credentialsValidator.validatePassword(user.getPassword());
         
        Authentication authentication = authManager.authenticate(
            new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
        );
        
        MyUserDetails userDetails = (MyUserDetails) authentication.getPrincipal();

        Set<String> authorities = userDetails.getAuthorities()
                                    .stream()
                                    .map(GrantedAuthority::getAuthority)
                                    .collect(Collectors.toSet());

        if(!authorities.contains(role.toString())) {
            throw new UnAuthorizedException("no no no");
        }

        return jwt.generateToken(userDetails.getUserId());

    }

}
