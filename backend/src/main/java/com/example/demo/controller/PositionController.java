package com.example.demo.controller;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Position;
import com.example.demo.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/positions")
public class PositionController {

    @Autowired
    PositionService service;

    @GetMapping("")
    public List<Position> findAll(){
        return service.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Position> findById(@PathVariable Long id){
        Optional<Position> e = service.findById(id);
        return e.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Position> add(@RequestBody Position position){
        return new ResponseEntity<>(service.add(position), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Position> update(@PathVariable Long id, @RequestBody Position position) {
        try {
            return new ResponseEntity<>(service.update(id, position), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
