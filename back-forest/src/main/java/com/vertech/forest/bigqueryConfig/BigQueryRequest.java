package com.vertech.forest.bigqueryConfig;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.auth.oauth2.ServiceAccountCredentials;
import com.google.cloud.bigquery.*;
import com.vertech.forest.web.controller.dto.queries.TreeCounterResult;

import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

public class BigQueryRequest {
    public static List<TreeCounterResult> executeRequest(
            String query,
            String jsonKeyPath,
            String projectId,
            String yearLabel,
            String quantityLabel) throws IOException, InterruptedException {

        List<TreeCounterResult> dataList = new ArrayList<>();

        GoogleCredentials credentials;

        // Load the credentials file as an InputStream
        try (InputStream credentialsStream = BigQueryRequest.class.getResourceAsStream(jsonKeyPath)) {
            credentials = ServiceAccountCredentials.fromStream(credentialsStream);
        }

        // Instantiate a client.
        BigQuery bigquery =
                BigQueryOptions.newBuilder()
                        .setCredentials(credentials)
                        .setProjectId(projectId)
                        .build()
                        .getService();

        QueryJobConfiguration queryConfig =
                QueryJobConfiguration.newBuilder(query).build();

        Job queryJob = bigquery.create(JobInfo.newBuilder(queryConfig).build());
        queryJob = queryJob.waitFor();
        TableResult result = queryJob.getQueryResults();

        for(FieldValueList row : result.iterateAll()){
            TreeCounterResult treeCounterResult = new TreeCounterResult();

            if (row.get(0).getValue() != null && row.get(1).getValue() != null){

                int year = row.get(yearLabel).getNumericValue().intValue();
                int quantity = row.get(quantityLabel).getNumericValue().intValue();

                treeCounterResult.setInventoryYear(year);
                treeCounterResult.setTreeQuantity(quantity);

                dataList.add(treeCounterResult);
                System.out.println("Year: " + year + " - Quantity: " + quantity);
            }
        }

        return dataList;
    }
}
