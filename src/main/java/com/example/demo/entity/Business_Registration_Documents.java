package com.example.demo.entity;

import com.example.demo.enums.Business_Registration_Document_Status;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="business_registration_documents")
@Getter
@Setter
@NoArgsConstructor
public class Business_Registration_Documents {
    
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    
    @Column(name="file_url")
    private String file_url;

    @Column(name="verification_status")
    private Business_Registration_Document_Status status; 

}
