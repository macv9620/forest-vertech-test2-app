package com.vertech.forest.service;

import com.vertech.forest.persistence.entity.StateInfoEntity;
import com.vertech.forest.persistence.repository.StateRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateInfoService {
    // Repository for StateInfoEntity
    private final StateRepository stateRepository;

    public StateInfoService(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    // Method to retrieve all StateInfoEntities
    public List<StateInfoEntity> getAllStates(){
        return stateRepository.findAll();
    }
}