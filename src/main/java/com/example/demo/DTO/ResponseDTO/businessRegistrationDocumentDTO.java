package com.example.demo.DTO.ResponseDTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
public class businessRegistrationDocumentDTO {
    
    private Integer id;
    private String fileUrl;
    private String status;

}
