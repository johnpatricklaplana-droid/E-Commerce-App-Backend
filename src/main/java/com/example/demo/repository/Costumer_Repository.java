package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.Costumer;

public interface Costumer_Repository extends JpaRepository<Costumer, Integer> {
    
}
