package com.example.demo.service;

import com.example.demo.entity.Employee;

import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    List<Employee> findAll();

    List<Employee> searchEmployeeByName(String name);;

    Optional<Employee> findById(Long id);

    Employee add(Employee employee);

    Employee update(Long id, Employee employee);

    void delete(Long id);
}
