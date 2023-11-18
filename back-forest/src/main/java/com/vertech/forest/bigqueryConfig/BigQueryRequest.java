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
    // Method to execute a BigQuery request and retrieve results
    public static List<TreeCounterResult> executeRequest(
            String query,
            String jsonKeyPath,
            String projectId,
            String yearLabel,
            String quantityLabel) throws IOException, InterruptedException {

        List<TreeCounterResult> dataList = new ArrayList<>();

        // Variable to hold Google credentials
        GoogleCredentials credentials;

        // Load the credentials file as an InputStream
        try (InputStream credentialsStream = BigQueryRequest.class.getResourceAsStream(jsonKeyPath)) {
            credentials = ServiceAccountCredentials.fromStream(credentialsStream);
        }

        // Instantiate a BigQuery client with the provided credentials and project ID
        BigQuery bigquery =
                BigQueryOptions.newBuilder()
                        .setCredentials(credentials)
                        .setProjectId(projectId)
                        .build()
                        .getService();

        // Configure the BigQuery query job
        QueryJobConfiguration queryConfig =
                QueryJobConfiguration.newBuilder(query).build();

        // Create and execute the query job
        Job queryJob = bigquery.create(JobInfo.newBuilder(queryConfig).build());
        queryJob = queryJob.waitFor();
        TableResult result = queryJob.getQueryResults();

        // Iterate over the query results
        for (FieldValueList row : result.iterateAll()) {
            TreeCounterResult treeCounterResult = new TreeCounterResult();

            // Check if the required fields are not null
            if (row.get(0).getValue() != null && row.get(1).getValue() != null) {

                // Extract values from the result row
                int year = row.get(yearLabel).getNumericValue().intValue();
                int quantity = row.get(quantityLabel).getNumericValue().intValue();

                // Set values in the TreeCounterResult object
                treeCounterResult.setInventoryYear(year);
                treeCounterResult.setTreeQuantity(quantity);

                dataList.add(treeCounterResult);
            }
        }

        return dataList;
    }
}
