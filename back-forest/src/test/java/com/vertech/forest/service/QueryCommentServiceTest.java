package com.vertech.forest.service;

import com.vertech.forest.persistence.entity.QueryCommentEntity;
import com.vertech.forest.persistence.repository.QueryCommentRepository;
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

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class QueryCommentServiceTest {

    @Mock
    private QueryCommentRepository queryCommentRepository;

    @Mock
    private UserRepository userRepository;

    @Mock
    private QueryRepository queryRepository;

    @InjectMocks
    private QueryCommentService queryCommentService;

    @Test
    public void testSave() {
        QueryCommentEntity queryCommentEntity = new QueryCommentEntity();
        queryCommentEntity.setCommentNickName("teo96");
        queryCommentEntity.setQueryId(1);

        when(userRepository.existsById("teo96")).thenReturn(true);
        when(queryRepository.existsById(1)).thenReturn(true);
        when(queryCommentRepository.save(queryCommentEntity)).thenReturn(queryCommentEntity);

        QueryCommentEntity savedComment = queryCommentService.save(queryCommentEntity);

        assertNotNull(savedComment);
        assertEquals(queryCommentEntity, savedComment);

        verify(userRepository, times(1)).existsById("teo96");
        verify(queryRepository, times(1)).existsById(1);
        verify(queryCommentRepository, times(1)).save(queryCommentEntity);
    }

    @Test
    public void testSaveWithInvalidUser() {
        QueryCommentEntity queryCommentEntity = new QueryCommentEntity();
        queryCommentEntity.setCommentNickName("nonExistingUser");
        queryCommentEntity.setQueryId(1);

        when(userRepository.existsById("nonExistingUser")).thenReturn(false);

        assertThrows(CheckDataCustomException.class, () -> queryCommentService.save(queryCommentEntity));

        verify(userRepository, times(1)).existsById("nonExistingUser");
        verify(queryRepository, never()).existsById(anyInt());
        verify(queryCommentRepository, never()).save(any());
    }

    @Test
    public void testSaveWithInvalidQueryId() {
        QueryCommentEntity queryCommentEntity = new QueryCommentEntity();
        queryCommentEntity.setCommentNickName("teo96");
        queryCommentEntity.setQueryId(2);

        when(userRepository.existsById("teo96")).thenReturn(true);
        when(queryRepository.existsById(2)).thenReturn(false);

        assertThrows(CheckDataCustomException.class, () -> queryCommentService.save(queryCommentEntity));

        verify(userRepository, times(1)).existsById("teo96");
        verify(queryRepository, times(1)).existsById(2);
        verify(queryCommentRepository, never()).save(any());
    }

    @Test
    public void testGetAll() {
        QueryCommentEntity comment1 = new QueryCommentEntity();
        QueryCommentEntity comment2 = new QueryCommentEntity();
        List<QueryCommentEntity> commentList = Arrays.asList(comment1, comment2);

        when(queryCommentRepository.findAll()).thenReturn(commentList);

        List<QueryCommentEntity> result = queryCommentService.getAll();

        assertEquals(commentList, result);

        verify(queryCommentRepository, times(1)).findAll();
    }
}
