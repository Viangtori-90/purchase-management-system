package com.example.purchaseapp.repository;

import com.example.purchaseapp.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, String> {
    // String - потому что @Id это customer_code (String)
}