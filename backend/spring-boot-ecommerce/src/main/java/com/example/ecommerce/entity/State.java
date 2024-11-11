package com.example.ecommerce.entity;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter


@Entity
@Table(name = "state")
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToOne
    @JoinColumn(name = "country_id")
    private Country country;

    public State() {
    }

    public State(String name, Country country) {
        this.name = name;
        this.country = country;
    }

    
}
