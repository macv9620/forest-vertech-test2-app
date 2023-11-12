package com.vertech.forest.bigqueryConfig;

import com.vertech.forest.web.controller.dto.queries.UserQueryInfo;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class QueryBuilder {
    public static String buildQuery(UserQueryInfo userQueryInfo){

        String query = "";

            if (Objects.equals(userQueryInfo.getQueryType(), "tree_quantity")){
            query = "SELECT DISTINCT measurement_year, COUNT(unique_tree) AS tree_quantity FROM " +
                                        "`bigquery-public-data.usfs_fia." + userQueryInfo.getTable() + "` ";
            List<String> filtersList = new ArrayList<>();

            if (userQueryInfo.getFilters().getStateCode() != null){
                String stateCodefilter = "";
                stateCodefilter = stateCodefilter.concat("plot_state_code IN(");
                String stateFilter = userQueryInfo.getFilters().getStateCode().stream().map(stateCode -> stateCode + "")
                        .collect(Collectors.joining(", "));
                stateCodefilter = stateCodefilter.concat(stateFilter + ")");
                filtersList.add(stateCodefilter);
            }

            if (userQueryInfo.getFilters().getInventoryYear() != null){
                String yearFilter = "";
                List<Integer> yearRange = userQueryInfo.getFilters().getInventoryYear();
                yearFilter = yearFilter.concat("measurement_year BETWEEN " + yearRange.get(0) + " AND " + yearRange.get(1));
                filtersList.add(yearFilter);
            }

            if (userQueryInfo.getFilters().getTreeHeight() != null){
                String heightFilter = "";
                List<Integer> heightRange = userQueryInfo.getFilters().getTreeHeight();
                heightFilter = heightFilter.concat("total_height BETWEEN " + heightRange.get(0) + " AND " + heightRange.get(1));
                filtersList.add(heightFilter);
            }

            if (userQueryInfo.getFilters().getSpecieCode() != null){
                String specieCodefilter = "";
                specieCodefilter = specieCodefilter.concat("species_code IN(");
                String stateFilter = userQueryInfo.getFilters().getSpecieCode().stream().map(stateCode -> stateCode + "")
                        .collect(Collectors.joining(", "));
                specieCodefilter = specieCodefilter.concat(stateFilter + ")");
                filtersList.add(specieCodefilter);
            }

            if (!filtersList.isEmpty()){
                String filtersQuery = String.join(" AND ", filtersList);
                query = query.concat("WHERE " + filtersQuery + " GROUP BY measurement_year ORDER BY measurement_year ASC;");
            } else {
                query = query.concat(" GROUP BY measurement_year ORDER BY measurement_year ASC;");
            }
        }

        return query;
    }
}
