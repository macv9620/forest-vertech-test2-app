package com.vertech.forest.service;

import com.vertech.forest.persistence.entity.QueryEntity;
import com.vertech.forest.persistence.repository.QueryRepository;
import com.vertech.forest.persistence.repository.UserRepository;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class QueryService {

    private final QueryRepository queryRepository;
    private final UserRepository userRepository;


    public QueryService(QueryRepository queryRepository, UserRepository userRepository) {
        this.queryRepository = queryRepository;
        this.userRepository = userRepository;
    }

    // Method to save a QueryEntity
    public QueryEntity saveQuery(QueryEntity queryEntity) throws CheckDataCustomException {
        // Check if the nickName exists in the UserRepository
        if (!userRepository.existsById(queryEntity.getNickName())){
            throw new CheckDataCustomException("Invalid nickName, user doesn't exist");
        }
        // Save the QueryEntity in the QueryRepository
        return queryRepository.save(queryEntity);
    }

    // Method to retrieve all QueryEntities
    public List<QueryEntity> getAll(){
        return queryRepository.findAll();
    }

    // Method to retrieve a QueryEntity by its ID
    public Optional<QueryEntity> getQueryById(int queryId){
        return queryRepository.findById(queryId);
    }
}