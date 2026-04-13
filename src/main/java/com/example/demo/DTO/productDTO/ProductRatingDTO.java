package com.example.demo.DTO.productDTO;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class ProductRatingDTO {
    private double rating;
    private int numberOfRaters;
}
