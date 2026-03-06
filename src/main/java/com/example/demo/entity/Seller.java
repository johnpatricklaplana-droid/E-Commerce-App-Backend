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
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name="seller")
@Setter
@Getter
@NoArgsConstructor
public class Seller {

    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;

    @Column(name="first_name")
    private String first_name;

    @Column(name="last_name")
    private String last_name;

    @OneToOne
    @JoinColumn(name="seller_paper_id")
    private Seller_Papers papers;

    @Column(name="email")
    private String email;

    @Column(name="password")
    private String password;

    @Column(name="profile_pic_image_path")
    private String profile_pic_image_path;

    @ManyToMany
    @JoinTable(
        name="seller_location",
        joinColumns=@JoinColumn(name="seller_id"),
        inverseJoinColumns=@JoinColumn(name="location_id")
    )
    private List<User_Location> seller_location;

    @OneToMany(mappedBy="seller")
    List<Seller_Bank_Account> seller_Bank_Accounts;
}
