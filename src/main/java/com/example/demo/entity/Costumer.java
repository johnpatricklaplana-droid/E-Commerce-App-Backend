package com.example.demo.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Setter
@Getter
@Table(name="costumers")
public class Costumer {
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    @Id
    private Integer id;

    @Column(name="first_name")
    private String first_name;

    @Column(name="last_name")
    private String last_name;

    @Column(name="image_file_path")
    private String profile_pic;

    @Column(name="email")
    private String email;

    @Column(name="password")
    private String password;

    @Column(name="role")
    private String role;

    @ManyToMany
    @JoinTable(
        name="costumer_location",
        joinColumns=@JoinColumn(name="costumer_id"),
        inverseJoinColumns=@JoinColumn(name="location_id")
    )
    private List<User_Location> costumer_location;
}
