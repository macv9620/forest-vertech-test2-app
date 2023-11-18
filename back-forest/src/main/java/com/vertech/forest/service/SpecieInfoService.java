package com.vertech.forest.service;

import com.vertech.forest.persistence.entity.SpecieInfoEntity;
import com.vertech.forest.persistence.repository.SpecieInfoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SpecieInfoService {
    // Repository for SpecieInfoEntity
    private final SpecieInfoRepository specieInfoRepository;

    public SpecieInfoService(SpecieInfoRepository specieInfoRepository) {
        this.specieInfoRepository = specieInfoRepository;
    }

    // Method to retrieve all SpecieInfoEntities
    public List<SpecieInfoEntity> getAllSpecies(){
        return specieInfoRepository.findAll();
    }
}