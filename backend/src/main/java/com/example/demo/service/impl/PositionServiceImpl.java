package com.example.demo.service.impl;

import com.example.demo.entity.Employee;
import com.example.demo.entity.Position;
import com.example.demo.repository.PositionRepository;
import com.example.demo.service.PositionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PositionServiceImpl implements PositionService {

    @Autowired
    PositionRepository repository;

        @Override
        public Page<Position> findAll(Pageable pageable) {
            return repository.findAll(pageable);
        }

    @Override
    public List<Position> findAl() {
        return repository.findAll();
    }

    @Override
    public Optional<Position> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    public Position add(Position position) {
        return repository.save(position);
    }

    @Override
    public Position update(Long id, Position position) {
        Optional<Position> existingPositionOptional = repository.findById(id);
        if (existingPositionOptional.isPresent()) {
            Position existingPosition = existingPositionOptional.get();

            existingPosition.setName(position.getName());

            return repository.save(existingPosition);
        } else {
            throw new RuntimeException("Position not found with id: " + id);
        }
    }

}
