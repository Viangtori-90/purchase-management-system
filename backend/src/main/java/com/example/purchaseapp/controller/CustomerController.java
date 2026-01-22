package com.example.purchaseapp.controller;

import com.example.purchaseapp.entity.Customer;
import com.example.purchaseapp.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
public class CustomerController {

    @Autowired
    private CustomerRepository customerRepository;

    // Получить всех
    @GetMapping
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    // Получить по коду
    @GetMapping("/{code}")
    public ResponseEntity<Customer> getCustomerByCode(@PathVariable String code) {
        return customerRepository.findById(code)
                .map(customer -> ResponseEntity.ok(customer))
                .orElse(ResponseEntity.notFound().build());
    }

    // Создать
    @PostMapping
    public ResponseEntity<Customer> createCustomer(@RequestBody Customer customer) {
        Customer saved = customerRepository.save(customer);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    // Обновить
    @PutMapping("/{code}")
    public ResponseEntity<Customer> updateCustomer(@PathVariable String code, @RequestBody Customer customer) {
        if (!customerRepository.existsById(code)) {
            return ResponseEntity.notFound().build();
        }
        customer.setCustomerCode(code); // Убедимся что код совпадает
        Customer updated = customerRepository.save(customer);
        return ResponseEntity.ok(updated);
    }

    // Удалить
    @DeleteMapping("/{code}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable String code) {
        if (!customerRepository.existsById(code)) {
            return ResponseEntity.notFound().build();
        }
        customerRepository.deleteById(code);
        return ResponseEntity.noContent().build();
    }
}