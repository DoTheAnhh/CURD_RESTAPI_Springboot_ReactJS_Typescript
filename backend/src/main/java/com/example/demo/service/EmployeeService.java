package com.example.demo.service;

import com.example.demo.entity.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    List<Employee> findAll();

    Optional<Employee> findById(Long id);

    List<Employee> searchEmployeeByName(String name);

    Employee add(Employee employee);

    Employee update(Long id, Employee employee);

    void delete(Long id);
}
