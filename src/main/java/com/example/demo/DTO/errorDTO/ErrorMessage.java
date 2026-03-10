package com.example.demo.DTO.errorDTO;

import lombok.Getter;

@Getter
public class ErrorMessage {

    private String message;

    public ErrorMessage(String message) {
        this.message = message;
    }
    
}
