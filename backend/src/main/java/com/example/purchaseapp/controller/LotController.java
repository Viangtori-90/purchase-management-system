package com.example.purchaseapp.controller;

import com.example.purchaseapp.entity.Lot;
import com.example.purchaseapp.repository.LotRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/lots")
public class LotController {

    @Autowired
    private LotRepository lotRepository;

    @GetMapping
    public List<Lot> getAllLots() {
        return lotRepository.findAll();
    }

    @GetMapping("/{name}")
    public ResponseEntity<Lot> getLotByName(@PathVariable String name) {
        return lotRepository.findById(name)
                .map(lot -> ResponseEntity.ok(lot))
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Lot> createLot(@RequestBody Lot lot) {
        Lot saved = lotRepository.save(lot);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{name}")
    public ResponseEntity<Lot> updateLot(@PathVariable String name, @RequestBody Lot lot) {
        if (!lotRepository.existsById(name)) {
            return ResponseEntity.notFound().build();
        }
        lot.setLotName(name);
        Lot updated = lotRepository.save(lot);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{name}")
    public ResponseEntity<Void> deleteLot(@PathVariable String name) {
        if (!lotRepository.existsById(name)) {
            return ResponseEntity.notFound().build();
        }
        lotRepository.deleteById(name);
        return ResponseEntity.noContent().build();
    }
}