package com.example.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.ecommerce.entity.Country;


@CrossOrigin("http://localhost:4200/")
@RepositoryRestResource(path = "countries", collectionResourceRel = "countries")
public interface CountryRepository extends JpaRepository<Country, Long> {
    
}
