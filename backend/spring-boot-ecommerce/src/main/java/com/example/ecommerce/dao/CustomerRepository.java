package com.example.ecommerce.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ecommerce.entity.Customer;


public interface CustomerRepository extends JpaRepository<Customer, Long> {
    
}
