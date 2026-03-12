package com.example.demo.DTO.ResponseDTO;

import lombok.Getter;

@Getter
public class HttpResponse {

    private String message;

    public HttpResponse(String message) {
        this.message = message;
    }
    
}
