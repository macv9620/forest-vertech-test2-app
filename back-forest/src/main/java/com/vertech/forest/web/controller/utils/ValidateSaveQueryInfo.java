package com.vertech.forest.web.controller.utils;

import com.vertech.forest.persistence.entity.QueryEntity;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;

public class ValidateSaveQueryInfo {
    // Method to validate and check necessary fields in a QueryEntity
    public static void check(QueryEntity queryEntity) throws CheckDataCustomException{
        // Check if the nickName field is null
        if(queryEntity.getNickName() == null){
            throw new CheckDataCustomException("nickName is required");
        }

        // Check if the queryDescription field is null
        if(queryEntity.getQueryDescription() == null){
            throw new CheckDataCustomException("queryDescription is required");
        }

        // Check if the queryName field is null
        if(queryEntity.getQueryName() == null){
            throw new CheckDataCustomException("queryName is required");
        }

        // Check if the queryJson field is null
        if(queryEntity.getQueryJson() == null){
            throw new CheckDataCustomException("queryJson is required");
        }
    }
}