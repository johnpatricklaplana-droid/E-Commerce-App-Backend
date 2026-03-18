package com.example.demo.Service.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.Service.Jwt;
import com.example.demo.entity.User;
import com.example.demo.enums.User_Role;
import com.example.demo.exceptions.ResourceNotFoundException;
import com.example.demo.exceptions.UnAuthorizedException;
import com.example.demo.repository.UserRepository;
import com.example.demo.utils.CredentialsValidator;

@Service
public class UserAuthService {
    
    @Autowired
    UserRepository userRepository;

    @Autowired
    Jwt jwt;

    @Autowired
    CredentialsValidator credentialsValidator;

    public String login (User user, User_Role role) {

        String email = user.getEmail();
        String password = user.getPassword();

        credentialsValidator.validateEmail(email);
        credentialsValidator.validatePassword(password);

        User userFromDB = userRepository.findByEmail(email);

        if(userFromDB == null) {
            throw new ResourceNotFoundException("wrong credentials");
        }
    
        if(!password.equals(userFromDB.getPassword())) {
            throw new ResourceNotFoundException("wrong credentials");
        }

        if(!userFromDB.getRole().equals(role)) {
            throw new UnAuthorizedException("no no no");
        }

        return jwt.generateToken(userFromDB.getId().toString());

    }

}
