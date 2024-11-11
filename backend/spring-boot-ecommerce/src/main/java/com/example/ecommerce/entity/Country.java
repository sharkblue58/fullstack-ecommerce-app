package com.example.ecommerce.entity;

import java.util.*;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter


@Entity
@Table(name = "country")
public class Country {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "code")
    private String code;

    @OneToMany(mappedBy = "country")
    private List<State> states;

    public Country() {
    }

    public Country(String name, String code, List<State> states) {
        this.name = name;
        this.code = code;
        this.states = states;
    }

    
}
