package com.example.purchaseapp.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "customer", schema = "purchase")
public class Customer {

    @Id
    @Column(name = "customer_code")
    private String customerCode;

    @Column(name = "customer_name")
    private String customerName;

    @Column(name = "customer_inn")
    private String customerInn;

    @Column(name = "customer_kpp")
    private String customerKpp;

    @Column(name = "customer_legal_address")
    private String customerLegalAddress;

    @Column(name = "customer_postal_address")
    private String customerPostalAddress;

    @Column(name = "customer_email")
    private String customerEmail;

    @Column(name = "customer_code_main")
    private String customerCodeMain;

    @Column(name = "is_organization")
    private Boolean isOrganization;

    @Column(name = "is_person")
    private Boolean isPerson;

    @Column(name = "phone")  // Только phone, не customer_phone!
    private String phone;

    // УДАЛИТЬ эти поля - их нет в задании!
    // private LocalDateTime createdAt;
    // private LocalDateTime updatedAt;

    // Конструкторы
    public Customer() {
    }

    public Customer(String customerCode, String customerName) {
        this.customerCode = customerCode;
        this.customerName = customerName;
    }

    // Геттеры и сеттеры для ВСЕХ полей
    public String getCustomerCode() {
        return customerCode;
    }

    public void setCustomerCode(String customerCode) {
        this.customerCode = customerCode;
    }

    public String getCustomerName() {
        return customerName;
    }

    public void setCustomerName(String customerName) {
        this.customerName = customerName;
    }

    public String getCustomerInn() {
        return customerInn;
    }

    public void setCustomerInn(String customerInn) {
        this.customerInn = customerInn;
    }

    public String getCustomerKpp() {
        return customerKpp;
    }

    public void setCustomerKpp(String customerKpp) {
        this.customerKpp = customerKpp;
    }

    public String getCustomerLegalAddress() {
        return customerLegalAddress;
    }

    public void setCustomerLegalAddress(String customerLegalAddress) {
        this.customerLegalAddress = customerLegalAddress;
    }

    public String getCustomerPostalAddress() {
        return customerPostalAddress;
    }

    public void setCustomerPostalAddress(String customerPostalAddress) {
        this.customerPostalAddress = customerPostalAddress;
    }

    public String getCustomerEmail() {
        return customerEmail;
    }

    public void setCustomerEmail(String customerEmail) {
        this.customerEmail = customerEmail;
    }

    public String getCustomerCodeMain() {
        return customerCodeMain;
    }

    public void setCustomerCodeMain(String customerCodeMain) {
        this.customerCodeMain = customerCodeMain;
    }

    public Boolean getIsOrganization() {
        return isOrganization;
    }

    public void setIsOrganization(Boolean isOrganization) {
        this.isOrganization = isOrganization;
    }

    public Boolean getIsPerson() {
        return isPerson;
    }

    public void setIsPerson(Boolean isPerson) {
        this.isPerson = isPerson;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }
}