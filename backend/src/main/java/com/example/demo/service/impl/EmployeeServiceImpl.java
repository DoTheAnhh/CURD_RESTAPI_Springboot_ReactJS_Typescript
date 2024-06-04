package com.example.demo.service.impl;

import com.example.demo.entity.Employee;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeServiceImpl implements EmployeeService {

    @Autowired
    EmployeeRepository repo;

    @Override
    public List<Employee> findAll() {
        return repo.findAll();
    }

    @Override
    public Optional<Employee> findById(Long id) {
        return repo.findById(id);
    }

    @Override
    public List<Employee> searchEmployeeByName(String name) {
        List<Employee> employees = repo.findByNameContainingIgnoreCase(name);
        if(employees.isEmpty()){
            return repo.findAll();
        }
        return employees;
    }

    @Override
    public Employee add(Employee employee) {
        return repo.save(employee);
    }

    @Override
    public Employee update(Long id, Employee updatedEmployee) {
        Optional<Employee> existingEmployeeOptional = repo.findById(id);
        if (existingEmployeeOptional.isPresent()) {
            Employee existingEmployee = existingEmployeeOptional.get();

            existingEmployee.setCode(updatedEmployee.getCode());
            existingEmployee.setName(updatedEmployee.getName());
            existingEmployee.setAge(updatedEmployee.getAge());
            existingEmployee.setGender(updatedEmployee.isGender());
            existingEmployee.setAddress(updatedEmployee.getAddress());

            return repo.save(existingEmployee);
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }


    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }


}
