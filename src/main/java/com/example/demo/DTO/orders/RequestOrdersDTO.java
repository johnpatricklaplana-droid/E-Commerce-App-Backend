package com.example.demo.DTO.orders;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RequestOrdersDTO {
    
    private Set<Integer> cartItemId;

}
