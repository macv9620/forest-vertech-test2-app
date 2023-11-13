package com.vertech.forest.service;

import com.vertech.forest.bigqueryConfig.BigQueryRequest;
import com.vertech.forest.bigqueryConfig.QueryBuilder;
import com.vertech.forest.web.controller.dto.queries.TreeCounterResult;
import com.vertech.forest.web.controller.dto.queries.UserQueryInfo;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class BigQueryService {
    public List<TreeCounterResult> executeQuery(UserQueryInfo userQueryInfo) throws IOException, InterruptedException {
        String query = QueryBuilder.buildQuery(userQueryInfo);
        System.out.println(query);
        return BigQueryRequest.executeRequest(query);
    }
}
