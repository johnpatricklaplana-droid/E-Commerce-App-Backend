package com.example.demo.DTO.productDTO;

import java.util.Set;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RelatedProductsDTO {
    
    private Set<String> categories;

}
