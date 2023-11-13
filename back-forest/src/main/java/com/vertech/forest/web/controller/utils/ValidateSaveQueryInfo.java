package com.vertech.forest.web.controller.utils;

import com.vertech.forest.persistence.entity.QueryEntity;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;


public class ValidateSaveQueryInfo {

    public static void check(QueryEntity queryEntity) throws CheckDataCustomException{
        if(queryEntity.getNickName() == null){
            throw new CheckDataCustomException("nickName is required");
        }

        if(queryEntity.getQueryDescription() == null){
            throw new CheckDataCustomException("queryDescription is required");
        }

        if(queryEntity.getQueryName() == null){
            throw new CheckDataCustomException("queryName is required");
        }

        if(queryEntity.getQueryJson() == null){
            throw new CheckDataCustomException("queryJson is required");
        }
    }
}
