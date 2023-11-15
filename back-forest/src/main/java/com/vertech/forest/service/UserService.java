package com.vertech.forest.service;

import com.vertech.forest.persistence.entity.UserEntity;
import com.vertech.forest.persistence.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserEntity createUser(UserEntity userEntity){
        return userRepository.save(userEntity);
    }

    public List<UserEntity> getAllUsers(){
        return userRepository.findAll();
    }

    public boolean userExists(String userId){
        return userRepository.existsById(userId);
    }

    public UserEntity getUserInfoById(String userId){
        return userRepository.findById(userId).get();
    }
}
