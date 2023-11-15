package com.vertech.forest.web.controller;

import com.vertech.forest.persistence.entity.UserEntity;
import com.vertech.forest.service.UserService;
import com.vertech.forest.web.controller.wrapper.ResponseWrapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public ResponseEntity<ResponseWrapper<?>> createUser(@RequestBody UserEntity userEntity){

        String message;
        UserEntity data;
        HttpStatus httpStatus;

        try {
            data = userService.createUser(userEntity);
            message = "User created successfully";
            httpStatus = HttpStatus.CREATED;
        } catch (Exception e){
            data = null;
            message = e.getMessage();
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        ResponseWrapper<UserEntity> responseWrapper = new ResponseWrapper<>(
                message,
                data
        );

        return new ResponseEntity<>(responseWrapper, httpStatus);
    }

    @GetMapping("/getAll")
    public ResponseEntity<ResponseWrapper<?>> getUsers(){
        String message;
        List<UserEntity> data;
        HttpStatus httpStatus;

        try {
            data = userService.getAllUsers();
            message = data.size() + " users found";
            httpStatus = HttpStatus.OK;
        } catch (Exception e){
            data = null;
            message = e.getMessage();
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        ResponseWrapper<List<UserEntity>> responseWrapper = new ResponseWrapper<>(
                message,
                data
        );

        return new ResponseEntity<>(responseWrapper, httpStatus);
    }

    @PostMapping("/login/{userId}")
    public ResponseEntity<ResponseWrapper<?>> login(@PathVariable String userId){

        String message;
        HttpStatus httpStatus;
        UserEntity data;

        try {
            boolean userExists = userService.userExists(userId);
            if (userExists){
                data = userService.getUserInfoById(userId);
                message = "Authorized";
                httpStatus = HttpStatus.OK;
            } else {
                message = "Unauthorized";
                httpStatus = HttpStatus.UNAUTHORIZED;
                data = null;
            }
        } catch (Exception e){
            data = null;
            message = e.getMessage();
            httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
        }

        ResponseWrapper<UserEntity> responseWrapper = new ResponseWrapper<>(
                message,
                data
        );

        return new ResponseEntity<>(responseWrapper, httpStatus);
    }

}
