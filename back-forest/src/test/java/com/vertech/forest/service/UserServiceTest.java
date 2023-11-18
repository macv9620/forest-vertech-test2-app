package com.vertech.forest.service;

import com.vertech.forest.persistence.entity.UserEntity;
import com.vertech.forest.persistence.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
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
public class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private UserService userService;

    private UserEntity testUser;

    @BeforeEach
    public void setUp() {
        testUser = new UserEntity();
        testUser.setNickName("teo96");
        testUser.setName("Mateo Vasco");
    }

    @Test
    public void testCreateUser() {
        when(userRepository.save(testUser)).thenReturn(testUser);

        UserEntity createdUser = userService.createUser(testUser);

        assertNotNull(createdUser);
        assertEquals(testUser, createdUser);

        verify(userRepository, times(1)).save(testUser);
    }

    @Test
    public void testGetAllUsers() {
        UserEntity user1 = new UserEntity();
        UserEntity user2 = new UserEntity();
        List<UserEntity> userList = Arrays.asList(user1, user2);

        when(userRepository.findAll()).thenReturn(userList);

        List<UserEntity> result = userService.getAllUsers();

        assertEquals(userList, result);

        verify(userRepository, times(1)).findAll();
    }

    @Test
    public void testUserExists() {
        when(userRepository.existsById("teo96")).thenReturn(true);
        when(userRepository.existsById("nonExistingUserId")).thenReturn(false);

        assertTrue(userService.userExists("teo96"));
        assertFalse(userService.userExists("nonExistingUserId"));

        verify(userRepository, times(1)).existsById("teo96");
        verify(userRepository, times(1)).existsById("nonExistingUserId");
    }

    @Test
    public void testGetUserInfoById() {
        when(userRepository.findById("teo96")).thenReturn(Optional.of(testUser));

        UserEntity result = userService.getUserInfoById("teo96");

        assertNotNull(result);
        assertEquals(testUser, result);

        verify(userRepository, times(1)).findById("teo96");
    }
}