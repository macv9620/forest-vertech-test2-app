package com.vertech.forest.web.controller.utils;

import com.vertech.forest.persistence.entity.QueryCommentEntity;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;

public class ValidateSaveQueryCommentInfo {
    public static void check(QueryCommentEntity queryCommentEntity) throws CheckDataCustomException{
        if(queryCommentEntity.getComment() == null){
            throw new CheckDataCustomException("comment field is required");
        }

        if(queryCommentEntity.getCommentNickName() == null){
            throw new CheckDataCustomException("commentNickName field is required");
        }

        if(queryCommentEntity.getQueryId() == null){
            throw new CheckDataCustomException("queryId field is required");
        }

    }
}
