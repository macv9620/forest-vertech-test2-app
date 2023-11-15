package com.vertech.forest.service;

import com.vertech.forest.persistence.entity.QueryCommentEntity;
import com.vertech.forest.persistence.repository.QueryCommentRepository;
import com.vertech.forest.persistence.repository.QueryRepository;
import com.vertech.forest.persistence.repository.UserRepository;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QueryCommentService {
    private final QueryCommentRepository queryCommentRepository;
    private final UserRepository userRepository;
    private final QueryRepository queryRepository;

    public QueryCommentService(QueryCommentRepository queryCommentRepository, UserRepository userRepository, QueryRepository queryRepository) {
        this.queryCommentRepository = queryCommentRepository;
        this.userRepository = userRepository;
        this.queryRepository = queryRepository;
    }

    public QueryCommentEntity save(QueryCommentEntity queryCommentEntity){
        if (!userRepository.existsById(queryCommentEntity.getCommentNickName())){
            throw new CheckDataCustomException("commentNickName doesn't exist");
        }

        if (!queryRepository.existsById(queryCommentEntity.getQueryId())){
            throw new CheckDataCustomException("queryId doesn't exist");
        }
        return queryCommentRepository.save(queryCommentEntity);
    }

    public List<QueryCommentEntity> getAll(){
        return queryCommentRepository.findAll();
    }
}
