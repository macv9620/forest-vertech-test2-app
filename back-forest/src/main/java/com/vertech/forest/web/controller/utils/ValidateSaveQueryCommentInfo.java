package com.vertech.forest.web.controller.utils;

import com.vertech.forest.persistence.entity.QueryCommentEntity;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;

public class ValidateSaveQueryCommentInfo {
    // Method to validate and check necessary fields in a QueryCommentEntity
    public static void check(QueryCommentEntity queryCommentEntity) throws CheckDataCustomException{
        // Check if the comment field is null
        if(queryCommentEntity.getComment() == null){
            throw new CheckDataCustomException("comment field is required");
        }

        // Check if the commentNickName field is null
        if(queryCommentEntity.getCommentNickName() == null){
            throw new CheckDataCustomException("commentNickName field is required");
        }

        // Check if the queryId field is null
        if(queryCommentEntity.getQueryId() == null){
            throw new CheckDataCustomException("queryId field is required");
        }
    }
}