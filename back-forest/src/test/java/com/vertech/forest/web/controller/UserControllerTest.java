package com.vertech.forest.web.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.vertech.forest.persistence.entity.UserEntity;
import com.vertech.forest.service.UserService;
import com.vertech.forest.web.controller.wrapper.ResponseWrapper;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserControllerTest {

    @Mock
    private UserService userService;

    @InjectMocks
    private UserController userController;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @Test
    public void testCreateUser() throws Exception {
        UserEntity userEntity = new UserEntity();
        userEntity.setName("teo96");

        when(userService.createUser(userEntity)).thenReturn(userEntity);

        ResponseEntity<ResponseWrapper<?>> responseEntity = userController.createUser(userEntity);

        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());

        ResponseWrapper<?> responseWrapper = new ResponseWrapper<>(
                "User created successfully",
                new UserEntity()
        );

        assertEquals("User created successfully", responseWrapper.getMessage());

        verify(userService, times(1)).createUser(userEntity);
    }

    @Test
    public void testGetUsers() throws Exception {
        UserEntity user1 = new UserEntity();
        UserEntity user2 = new UserEntity();
        List<UserEntity> userList = Arrays.asList(user1, user2);

        when(userService.getAllUsers()).thenReturn(userList);

        ResponseEntity<ResponseWrapper<?>> responseEntity = userController.getUsers();

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        ResponseWrapper<?> responseWrapper = new ResponseWrapper<>(
                "2 users found",
                new UserEntity()
        );

        assertEquals(userList.size() + " users found", responseWrapper.getMessage());

        verify(userService, times(1)).getAllUsers();
    }

    @Test
    public void testLoginAuthorized() throws Exception {
        String userId = "testUserId";
        UserEntity userEntity = new UserEntity();
        userEntity.setNickName(userId);

        when(userService.userExists(userId)).thenReturn(true);
        when(userService.getUserInfoById(userId)).thenReturn(userEntity);

        ResponseEntity<ResponseWrapper<?>> responseEntity = userController.login(userId);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());

        ResponseWrapper<?> responseWrapper = new ResponseWrapper<>(
                "Authorized",
                new UserEntity()
        );

        assertEquals("Authorized", responseWrapper.getMessage());

        verify(userService, times(1)).userExists(userId);
        verify(userService, times(1)).getUserInfoById(userId);
    }

    @Test
    public void testLoginUnauthorized() throws Exception {
        String userId = "nonExistingUserId";

        when(userService.userExists(userId)).thenReturn(false);

        ResponseEntity<ResponseWrapper<?>> responseEntity = userController.login(userId);

        assertEquals(HttpStatus.UNAUTHORIZED, responseEntity.getStatusCode());

        ResponseWrapper<?> responseWrapper = new ResponseWrapper<>(
                "Unauthorized",
                new UserEntity()
        );

        assertEquals("Unauthorized", responseWrapper.getMessage());

        verify(userService, times(1)).userExists(userId);
        verify(userService, never()).getUserInfoById(userId);
    }
}