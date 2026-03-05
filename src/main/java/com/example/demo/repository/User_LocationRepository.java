package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.User_Location;

public interface  User_LocationRepository extends JpaRepository<User_Location, Integer> {
    
}
