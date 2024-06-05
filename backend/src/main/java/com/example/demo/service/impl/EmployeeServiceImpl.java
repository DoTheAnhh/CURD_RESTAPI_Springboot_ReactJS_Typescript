package com.example.demo.service.impl;

import com.example.demo.entity.Employee;
import com.example.demo.entity.specification.EmployeeSpecifications;
import com.example.demo.repository.EmployeeRepository;
import com.example.demo.service.EmployeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.regex.Pattern;

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
        String normalizedSearchTerm = removeVietnameseTones(name);
        List<Employee> result = repo.findByNameContainingIgnoreCase(name);
        if (result.isEmpty()) {
            result = repo.findByNameContainingIgnoreCase(normalizedSearchTerm);
        }
        return result;
    }

    private String removeVietnameseTones(String str) {
        str = Normalizer.normalize(str, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        str = pattern.matcher(str).replaceAll("");
        str = str.replaceAll("Đ", "D");
        str = str.replaceAll("đ", "d");
        return str;
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
            existingEmployee.setPosition(updatedEmployee.getPosition());

            return repo.save(existingEmployee);
        } else {
            throw new RuntimeException("Employee not found with id: " + id);
        }
    }

    @Override
    public void delete(Long id) {
        repo.deleteById(id);
    }

    @Override
    public List<Employee> searchEmployees(String name, Boolean gender, String position) {
        Specification<Employee> spec = Specification.where(null);

        if (name != null && !name.trim().isEmpty()) {
            spec = spec.and(EmployeeSpecifications.hasName(name));
        }

        if (gender != null) {
            spec = spec.and(EmployeeSpecifications.hasGender(gender));
        }

        if (position != null && !position.trim().isEmpty()) {
            spec = spec.and(EmployeeSpecifications.hasPosition(position));
        }

        return repo.findAll(spec);
    }
}
