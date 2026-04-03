package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.Business_Registration_Documents;

public interface BusinessRegistrationDocumentsRepository extends JpaRepository<Business_Registration_Documents, Integer> {

    
}
