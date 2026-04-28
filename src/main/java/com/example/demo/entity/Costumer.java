package com.example.demo.entity;

import java.util.List;
import java.util.Set;

import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@NoArgsConstructor
@Setter
@Getter
@Table(name = "costumers")
public class Costumer extends User {

    @ManyToMany
    @JoinTable(
        name="costumer_location",
        joinColumns=@JoinColumn(name="costumer_id"),
        inverseJoinColumns=@JoinColumn(name="location_id")
    )
    private List<User_Location> costumer_location;

    @OneToMany(mappedBy = "costumer")
    private Set<CostumersCart> carts;

    @OneToMany(mappedBy = "costumer")
    private Set<Orders> orders;

}
