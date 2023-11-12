package com.vertech.forest.web.controller.utils;

import com.vertech.forest.web.controller.dto.queries.UserQueryInfo;
import com.vertech.forest.web.controller.exceptions.CheckDataCustomException;

public class ValidateUserQueryInfo {
    public static void check (UserQueryInfo userQueryInfo) throws CheckDataCustomException {

        if(userQueryInfo.getQueryType() == null || userQueryInfo.getTable() == null){
            throw new CheckDataCustomException("queryType and table params are required");
        }

        if (userQueryInfo.getFilters() == null){
            throw new CheckDataCustomException("filters param is required");
        }

        if (userQueryInfo.getFilters().getStateCode() != null && userQueryInfo.getFilters().getStateCode().isEmpty()){
            throw new CheckDataCustomException("stateCode cannot be empty");
        }

        if (userQueryInfo.getFilters().getSpecieCode() != null && userQueryInfo.getFilters().getSpecieCode().isEmpty()){
            throw new CheckDataCustomException("specieCode cannot be empty");
        }

        if (userQueryInfo.getFilters().getInventoryYear() != null) {
            if (userQueryInfo.getFilters().getInventoryYear().isEmpty()) {
                throw new CheckDataCustomException("inventoryYear cannot be empty");
            } else if (userQueryInfo.getFilters().getInventoryYear().size() != 2) {
                throw new CheckDataCustomException("inventoryYear must be a range with init year and final year defined");
            } else if (userQueryInfo.getFilters().getInventoryYear().get(0) > userQueryInfo.getFilters().getInventoryYear().get(1)) {
                throw new CheckDataCustomException("The starting inventoryYear must be less than the ending inventoryYear");
            }
        }

        if (userQueryInfo.getFilters().getTreeHeight() != null) {
            if (userQueryInfo.getFilters().getTreeHeight().isEmpty()) {
                throw new CheckDataCustomException("treeHeight cannot be empty");
            } else if (userQueryInfo.getFilters().getTreeHeight().size() != 2) {
                throw new CheckDataCustomException("treeHeight must be a range with min height and max height defined");
            } else if (userQueryInfo.getFilters().getTreeHeight().get(0) > userQueryInfo.getFilters().getTreeHeight().get(1)) {
                throw new CheckDataCustomException("The min treeHeight must be less than max treeHeight");
            }
        }


    }
}
