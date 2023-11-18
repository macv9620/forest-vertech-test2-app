package com.vertech.forest.service;

import com.vertech.forest.bigqueryConfig.BigQueryConfig;
import com.vertech.forest.bigqueryConfig.BigQueryRequest;
import com.vertech.forest.bigqueryConfig.QueryBuilder;
import com.vertech.forest.web.controller.dto.queries.TreeCounterResult;
import com.vertech.forest.web.controller.dto.queries.UserQueryInfo;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class BigQueryService {
    // BigQuery configuration object
    private final BigQueryConfig bigConf;

    public BigQueryService(BigQueryConfig bigQueryConfig, BigQueryConfig bigConf) {
        this.bigConf = bigConf;
    }

    // Method to execute a BigQuery based on user input
    public List<TreeCounterResult> executeQuery(UserQueryInfo userQueryInfo) throws IOException, InterruptedException {
        String query = QueryBuilder.buildQuery(
                userQueryInfo,
                bigConf.getYearLabel(),
                bigConf.getQuantityLabel(),
                bigConf.getDatabase(),
                bigConf.getTable(),
                bigConf.getStateCode(),
                bigConf.getHeight(),
                bigConf.getSpecieCode());

        return BigQueryRequest.executeRequest(
                query,
                bigConf.getKeyPath(),
                bigConf.getProjectId(),
                bigConf.getYearLabel(),
                bigConf.getQuantityLabel());
    }
}