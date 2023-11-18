package com.vertech.forest.service;

import com.vertech.forest.persistence.entity.SpecieInfoEntity;
import com.vertech.forest.persistence.repository.SpecieInfoRepository;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class SpecieInfoServiceTest {

    @Mock
    private SpecieInfoRepository specieInfoRepository;

    @InjectMocks
    private SpecieInfoService specieInfoService;

    @Test
    public void testGetAllSpecies() {
        SpecieInfoEntity specie1 = new SpecieInfoEntity();
        SpecieInfoEntity specie2 = new SpecieInfoEntity();
        List<SpecieInfoEntity> speciesList = Arrays.asList(specie1, specie2);

        when(specieInfoRepository.findAll()).thenReturn(speciesList);

        List<SpecieInfoEntity> result = specieInfoService.getAllSpecies();

        assertEquals(speciesList, result);

        verify(specieInfoRepository, times(1)).findAll();
    }
}