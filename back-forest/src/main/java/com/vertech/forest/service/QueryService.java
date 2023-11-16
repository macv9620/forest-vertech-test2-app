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

    public QueryEntity saveQuery(QueryEntity queryEntity) throws CheckDataCustomException {
        if (!userRepository.existsById(queryEntity.getNickName())){
            throw new CheckDataCustomException("Invalid nickName, user doesn't exist");
        }
        return queryRepository.save(queryEntity);
    }

    public List<QueryEntity> getAll(){
        return queryRepository.findAll();
    }

    public Optional<QueryEntity> getQueryById(int queryId){
        return queryRepository.findById(queryId);
    }
}
