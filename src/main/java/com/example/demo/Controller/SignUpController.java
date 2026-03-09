package com.example.demo.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.Service.SignupService;
import com.example.demo.entity.Costumer;

@RestController
public class SignUpController {

    @Autowired
    SignupService service;
    
    @PostMapping("/signup")
    public String signup (@RequestBody Costumer costumer) {
        service.signup(costumer);
        return "todo";
    }

}
