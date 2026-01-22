package com.example.purchaseapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Purchase Application API is running!<br>" +
                "<a href='/api/customers'>/api/customers</a> - Customers API<br>" +
                "<a href='/api/lots'>/api/lots</a> - Lots API";
    }

    @GetMapping("/health")
    public String health() {
        return "OK";
    }
}