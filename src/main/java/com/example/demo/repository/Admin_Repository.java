package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Admin;

public interface Admin_Repository extends JpaRepository<Admin, Integer> {

    boolean existsByEmail(String string);

    @Query("""
        SELECT a.id
        FROM Admin a
        WHERE a.email = :email
        """)
    Integer findByEmail(@Param("email") String admin_email);

    
}
