package com.vertech.forest.service;

import com.vertech.forest.persistence.entity.StateInfoEntity;
import com.vertech.forest.persistence.repository.StateRepository;
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
public class StateInfoServiceTest {

    @Mock
    private StateRepository stateRepository;

    @InjectMocks
    private StateInfoService stateInfoService;

    @Test
    public void testGetAllStates() {
        StateInfoEntity state1 = new StateInfoEntity();
        StateInfoEntity state2 = new StateInfoEntity();
        List<StateInfoEntity> statesList = Arrays.asList(state1, state2);

        when(stateRepository.findAll()).thenReturn(statesList);

        List<StateInfoEntity> result = stateInfoService.getAllStates();

        assertEquals(statesList, result);

        verify(stateRepository, times(1)).findAll();
    }
}