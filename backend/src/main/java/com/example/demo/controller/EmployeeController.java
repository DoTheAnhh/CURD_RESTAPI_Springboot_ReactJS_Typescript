package com.example.demo.controller;

import com.example.demo.entity.Employee;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1/employees")
public class EmployeeController {

    @Autowired
    EmployeeService service;

    @GetMapping("")
    public List<Employee> findAll(){
        return service.findAll();
    }

    @GetMapping("/search")
    public List<Employee> searchEmployeeByName(@RequestParam("name") String name) {
        String trimmedName = name.trim();
        if (!trimmedName.isEmpty()) {
            String normalizedSearchTerm = removeVietnameseTones(trimmedName);
            return service.searchEmployeeByName(normalizedSearchTerm);
        } else {
            return service.findAll();
        }
    }

    private String removeVietnameseTones(String str) {
        str = Normalizer.normalize(str, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        str = pattern.matcher(str).replaceAll("");
        str = str.replaceAll("Đ", "D");
        str = str.replaceAll("đ", "d");
        return str;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Employee> findById(@PathVariable Long id){
        Optional<Employee> e = service.findById(id);
        return e.map(value -> new ResponseEntity<>(value, HttpStatus.OK))
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<Employee> add(@RequestBody Employee employee){
        return new ResponseEntity<>(service.add(employee), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Employee> update(@PathVariable Long id, @RequestBody Employee employee) {
        try {
            return new ResponseEntity<>(service.update(id, employee), HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
