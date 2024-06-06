package com.example.demo.service;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Position;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Optional;

public interface PositionService {

    Page<Position> findAll(Pageable pageable);

    List<Position> findAl();

    Optional<Position> findById(Long id);

    Position add(Position position);

    Position update(Long id, Position position);
}
