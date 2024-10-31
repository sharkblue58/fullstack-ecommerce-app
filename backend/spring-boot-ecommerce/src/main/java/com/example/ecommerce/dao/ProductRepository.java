package com.example.ecommerce.dao;

import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.example.ecommerce.entity.Product;

// adding the @CrossOrigin annotation to allow cross origin requests from the frontend
@CrossOrigin("http://localhost:4200/")
public interface ProductRepository extends JpaRepository<Product, Long> {

    /*
     * using something called query methods to get
     * data from the database using Spring Data JPA
     * and type page and pageable are for pagination
     * page gives ( 'total elements' , 'total pages' ,'current position')
     * pageable gives ( 'page number' , 'page size' ,'previous page' , 'next page' )
     * the url will be
     * http://localhost:8080/api/products/search/findByCategoryId?id=1
     * the query will be select * from product where category_id = ?
     */
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);

    /* query is select * from product p where p.name like concat('%',:name,'%')
     */
    Page<Product> findByNameContaining(@Param("name") String name, Pageable pageable);

}
