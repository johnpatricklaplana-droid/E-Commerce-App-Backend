package com.example.demo.entity;

import com.example.demo.enums.Admin_Role;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="admin")
@Getter
@Setter
@NoArgsConstructor
public class Admin extends User {

    @Column(name = "contact_number")
    private String contact_number;

    @Column(name = "admin_role")
    @Enumerated(EnumType.STRING)
    private Admin_Role admin_role;

}
