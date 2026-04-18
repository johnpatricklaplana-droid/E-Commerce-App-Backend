package com.example.demo.DTO.sellerDTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingsDTO {
    
    private double rating;
    private String review;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
