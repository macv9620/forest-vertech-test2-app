package com.vertech.forest.service;

import com.vertech.forest.persistence.entity.QueryEntity;
import com.vertech.forest.persistence.repository.QueryRepository;
import com.vertech.forest.persistence.repository.UserRepository;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class QueryServiceTest {

    @Mock
    private QueryRepository queryRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private QueryService queryService;

    @Test
    public void testSaveQuery() throws CheckDataCustomException {
        QueryEntity queryEntity = new QueryEntity();
        queryEntity.setNickName("teo96");

        when(userRepository.existsById("teo96")).thenReturn(true);
        when(queryRepository.save(queryEntity)).thenReturn(queryEntity);

        QueryEntity savedQuery = queryService.saveQuery(queryEntity);

        assertNotNull(savedQuery);
        assertEquals(queryEntity, savedQuery);

        verify(userRepository, times(1)).existsById("teo96");
        verify(queryRepository, times(1)).save(queryEntity);
    }

    @Test
    public void testSaveQueryWithInvalidUser() {
        QueryEntity queryEntity = new QueryEntity();
        queryEntity.setNickName("nonExistingUser");

        when(userRepository.existsById("nonExistingUser")).thenReturn(false);

        assertThrows(CheckDataCustomException.class, () -> queryService.saveQuery(queryEntity));

        verify(userRepository, times(1)).existsById("nonExistingUser");
        verify(queryRepository, never()).save(queryEntity);
    }

    @Test
    public void testGetAll() {
        QueryEntity query1 = new QueryEntity();
        QueryEntity query2 = new QueryEntity();
        List<QueryEntity> queryList = Arrays.asList(query1, query2);

        when(queryRepository.findAll()).thenReturn(queryList);

        List<QueryEntity> result = queryService.getAll();

        assertEquals(queryList, result);

        verify(queryRepository, times(1)).findAll();
    }

    @Test
    public void testGetQueryById() {
        QueryEntity queryEntity = new QueryEntity();
        when(queryRepository.findById(1)).thenReturn(Optional.of(queryEntity));

        Optional<QueryEntity> result = queryService.getQueryById(1);

        assertTrue(result.isPresent());
        assertEquals(queryEntity, result.get());

        verify(queryRepository, times(1)).findById(1);
    }

    @Test
    public void testGetQueryByIdNotFound() {
        when(queryRepository.findById(1)).thenReturn(Optional.empty());

        Optional<QueryEntity> result = queryService.getQueryById(1);

        assertFalse(result.isPresent());

        verify(queryRepository, times(1)).findById(1);
    }
}
