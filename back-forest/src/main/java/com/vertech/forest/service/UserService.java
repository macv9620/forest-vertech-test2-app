package com.vertech.forest.service;

import com.vertech.forest.persistence.entity.UserEntity;
import com.vertech.forest.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    // Repository for UserEntity
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Method to create a new user
    public UserEntity createUser(UserEntity userEntity){
        return userRepository.save(userEntity);
    }

    // Method to retrieve all UserEntities
    public List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }

    // Method to check if a user with the given userId exists
    public boolean userExists(String userId){
        return userRepository.existsById(userId);
    }

    // Method to retrieve user information by userId
    public UserEntity getUserInfoById(String userId){
        return userRepository.findById(userId).get();
    }
}