package com.example.demo.Controller.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.user.UserAuthService;
import com.example.demo.entity.User;
import com.example.demo.enums.User_Role;

@RestController
public class AdminAuthController {

    @Autowired
    UserAuthService userAuthService;
    
    @PostMapping("/login/admin")
    public ResponseEntity<String> login (@RequestBody User user) {
        String token = userAuthService.login(user, User_Role.ROLE_ADMIN);

        String cookie = "token=" + token + "; httpOnly; path=/; Max-Age=3600; SameSite=Strict";

        return ResponseEntity
            .status(HttpStatus.OK)
            .header("Set-Cookie", cookie)
            .body("login success");
    }

}
