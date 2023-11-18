package com.vertech.forest.bigqueryConfig;

import com.vertech.forest.web.controller.dto.queries.UserQueryInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class QueryBuilder {
    // Method to build a BigQuery sql query based on user input
    public static String buildQuery(
            UserQueryInfo userQueryInfo,
            String yearLabel,
            String quantityLabel,
            String database,
            String table,
            String stateTableCode,
            String height,
            String specieCode) {

        String query = "";

        // Check if the query type is for counting tree quantity
        if (Objects.equals(userQueryInfo.getQueryType(), quantityLabel)) {
            // Construct the basic query structure
            query = "SELECT DISTINCT " + yearLabel + ", COUNT(" + table + ") AS " + quantityLabel + " FROM " +
                    "`" + database + userQueryInfo.getTable() + "` ";

            List<String> filtersList = new ArrayList<>();

            // Add state code filter if present
            if (userQueryInfo.getFilters().getStateCode() != null) {
                String stateCodefilter = "";
                stateCodefilter = stateCodefilter.concat(stateTableCode + " IN(");
                String stateFilter = userQueryInfo.getFilters().getStateCode().stream().map(stateCode -> stateCode + "")
                        .collect(Collectors.joining(", "));
                stateCodefilter = stateCodefilter.concat(stateFilter + ")");
                filtersList.add(stateCodefilter);
            }

            // Add inventory year filter if present
            if (userQueryInfo.getFilters().getInventoryYear() != null) {
                String yearFilter = "";
                List<Integer> yearRange = userQueryInfo.getFilters().getInventoryYear();
                yearFilter = yearFilter.concat(yearLabel + " BETWEEN " + yearRange.get(0) + " AND " + yearRange.get(1));
                filtersList.add(yearFilter);
            }

            // Add tree height filter if present
            if (userQueryInfo.getFilters().getTreeHeight() != null) {
                String heightFilter = "";
                List<Integer> heightRange = userQueryInfo.getFilters().getTreeHeight();
                heightFilter = heightFilter.concat(height + " BETWEEN " + heightRange.get(0) + " AND " + heightRange.get(1));
                filtersList.add(heightFilter);
            }

            // Add specie code filter if present
            if (userQueryInfo.getFilters().getSpecieCode() != null) {
                String specieCodefilter = "";
                specieCodefilter = specieCodefilter.concat(specieCode + " IN(");
                String stateFilter = userQueryInfo.getFilters().getSpecieCode().stream().map(stateCode -> stateCode + "")
                        .collect(Collectors.joining(", "));
                specieCodefilter = specieCodefilter.concat(stateFilter + ")");
                filtersList.add(specieCodefilter);
            }

            if (!filtersList.isEmpty()) {
                // Concatenate the filters and add to the query
                String filtersQuery = String.join(" AND ", filtersList);
                query = query.concat("WHERE " + filtersQuery + " GROUP BY " + yearLabel + " ORDER BY " + yearLabel + " ASC;");
            } else {
                // If no filters, simply group by and order by year
                query = query.concat(" GROUP BY " + yearLabel + " ORDER BY " + yearLabel + " ASC;");
            }
        }

        return query;
    }
}