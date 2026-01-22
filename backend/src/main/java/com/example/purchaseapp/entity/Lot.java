// Lot.java
package com.example.purchaseapp.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity
@Table(name = "lot", schema = "purchase")
public class Lot {
    @Id
    @Column(name = "lot_name")
    private String lotName;

    @Column(name = "customer_code")
    private String customerCode;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "currency_code")
    private String currencyCode;

    @Column(name = "nds_rate")
    private String ndsRate;

    @Column(name = "place_delivery")
    private String placeDelivery;

    @Column(name = "date_delivery")
    private LocalDateTime dateDelivery;
}