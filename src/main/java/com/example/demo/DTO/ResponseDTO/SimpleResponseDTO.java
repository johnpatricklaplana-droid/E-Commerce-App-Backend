package com.example.demo.DTO.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class SimpleResponseDTO {
    
    private String message;
    private int status;

}
