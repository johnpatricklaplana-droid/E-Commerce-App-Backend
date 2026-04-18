package com.example.demo.entity;

import java.util.List;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Setter
@Getter
@NoArgsConstructor
public class Seller extends User {

    @OneToOne
    @JoinColumn(name="seller_paper_id")
    private Sellers_Papers papers;

    @ManyToMany
    @JoinTable(
        name="seller_location",
        joinColumns=@JoinColumn(name="seller_id"),
        inverseJoinColumns=@JoinColumn(name="location_id")
    )
    private Set<User_Location> seller_location;

    @OneToMany(mappedBy="seller")
    private List<Seller_Bank_Account> seller_Bank_Accounts;

    @OneToMany(mappedBy = "sellers")
    private Set<SellerRatings> ratings;

    @OneToMany(mappedBy = "seller")
    private List<Product> products;

}
