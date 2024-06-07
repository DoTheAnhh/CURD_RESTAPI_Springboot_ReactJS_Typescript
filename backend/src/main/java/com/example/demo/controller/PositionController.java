package com.example.demo.controller;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Position;
import com.example.demo.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/v1/positions")
public class PositionController {

    @Autowired
    PositionService service;

    @GetMapping("")
    public Page<Position> getAllPositions(@PageableDefault(size = 5 ) Pageable pageable) {
        return service.findAll(pageable);
    }

    @GetMapping("/all")
    public List<Position> getAll() {
        return service.findAl();
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

    @GetMapping("/export")
    public ResponseEntity<byte[]> exportToExcel() throws IOException {
        byte[] excelData = service.exportPositionToExcel();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.set(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=position.xlsx");

        return ResponseEntity.ok()
                .headers(headers)
                .body(excelData);
    }
}
