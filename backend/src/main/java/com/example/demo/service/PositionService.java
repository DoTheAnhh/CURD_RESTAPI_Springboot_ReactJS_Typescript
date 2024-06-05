package com.example.demo.service;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Position;

import java.util.List;
import java.util.Optional;

public interface PositionService {

    List<Position> findAll();

    Optional<Position> findById(Long id);

    Position add(Position position);

    Position update(Long id, Position position);
}
