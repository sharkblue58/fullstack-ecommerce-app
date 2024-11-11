package com.example.ecommerce.config;

import java.util.*;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import com.example.ecommerce.entity.*;
import jakarta.persistence.*;
import jakarta.persistence.metamodel.EntityType;

// This config file is used to disable some HTTP methods using Spring Data REST
// The @Configuration annotation allows you to configure beans using Java code rather than XML, and it can be picked up by the container during scanning and managed by Spring's IoC.
@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    
    private EntityManager entityManager;

    public MyDataRestConfig(EntityManager theEntityManager) {
        entityManager = theEntityManager;
    }


    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        // array of unsupported actions which should be disabled for all entities
        HttpMethod[] theUnsupportedActions = { HttpMethod.PUT, HttpMethod.POST, HttpMethod.DELETE, HttpMethod.PATCH };
        Class<?>[] domains = { Product.class, ProductCategory.class, Country.class, State.class };

        // disable HTTP methods for Country: PUT, POST, DELETE, PATCH
        disableHttpMethods(config,domains ,theUnsupportedActions);

        // call an internal helper method to expose ids
        exposeIds(config);
    }

    private void disableHttpMethods(RepositoryRestConfiguration config,Class<?>[] domains , HttpMethod[] theUnsupportedActions) {
        for (Class<?> domainClass : domains) {
            config.getExposureConfiguration()
                    .forDomainType(domainClass)
                    .withItemExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions))
                    .withCollectionExposure((metdata, httpMethods) -> httpMethods.disable(theUnsupportedActions));
        }
    }

    private void exposeIds(RepositoryRestConfiguration config) {
        // expose entity ids 

        // - get a list of all entity classes from the entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // - create an array of the entity types
        List<Class<?>> entityClasses = new ArrayList<>();

        // - get the entity types for the entities
        for (EntityType<?> tempEntityType : entities) {
            entityClasses.add(tempEntityType.getJavaType());
        }

        // - expose the entity ids for array of entity/domain types
        Class<?>[] domainTypes = entityClasses.toArray(new Class[0]);
        config.exposeIdsFor(domainTypes);
    }

}
