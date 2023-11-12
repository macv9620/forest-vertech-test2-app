package com.vertech.forest.web.controller.dto.queries;

import org.springframework.stereotype.Component;

@Component
public class UserQueryInfo {
    private String queryType;
    private String table;
    private UserFilters userFilters;

    public String getQueryType() {
        return queryType;
    }

    public void setQueryType(String queryType) {
        this.queryType = queryType;
    }

    public String getTable() {
        return table;
    }

    public void setTable(String table) {
        this.table = table;
    }

    public UserFilters getFilters() {
        return userFilters;
    }

    public void setFilters(UserFilters userFilters) {
        this.userFilters = userFilters;
    }

    @Override
    public String toString() {
        return "UserQueryInfo{" +
                "queryType='" + queryType + '\'' +
                ", table='" + table + '\'' +
                ", filters=" + userFilters +
                '}';
    }
}
