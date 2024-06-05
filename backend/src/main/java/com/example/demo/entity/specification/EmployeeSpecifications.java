package com.example.demo.entity.specification;

import com.example.demo.entity.Employee;
import org.springframework.data.jpa.domain.Specification;

public class EmployeeSpecifications {

    public static Specification<Employee> hasName(String name) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.like(root.get("name"), "%" + name + "%");
    }

    public static Specification<Employee> hasGender(Boolean gender) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("gender"), gender);
    }

    public static Specification<Employee> hasPosition(String position) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("position"), position);
    }
}

