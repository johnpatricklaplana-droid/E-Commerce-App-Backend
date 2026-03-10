package com.example.demo.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Setter
@Getter
@Table(name="location")
public class User_Location {
    
    @Id
    @Column(name="id")
    private String id;

    @Column(name="street")
    private String street;

    @Column(name="city")
    private String city;

    @Column(name="province")
    private String province;

    @Column(name="postal_code")
    private String postal_code;

    @Column(name="country")
    private String country;

    @Column(name="latitude")
    private double latitude;

    @Column(name="longitude")
    private double longitude;

    @ManyToMany(mappedBy="costumer_location")
    private List<Costumer> costumers;

    @ManyToMany(mappedBy="seller_location")
    private List<Seller> sellers;
}
