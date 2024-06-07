package com.example.demo.service;

import com.example.demo.entity.Employee;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

public interface EmployeeService {

    Page<Employee> findAll(Pageable pageable);


    Optional<Employee> findById(Long id);

    Employee add(Employee employee);

    Employee update(Long id, Employee employee);

    void delete(Long id);

    List<Employee> searchEmployees(String name, Boolean gender, String position);

    byte[] exportEmployeeToExcel() throws IOException;
}
