package com.vertech.forest.bigqueryConfig;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class BigQueryConfig {
    @Value("${bigquery.key.json.path}")
    private String keyPath;

    @Value("${bigquery.project.id}")
    private String projectId;

    @Value("${bigquery.year.label}")
    private String yearLabel;

    @Value("${bigquery.quantity.label}")
    private String quantityLabel;

    @Value("${bigquery.database}")
    private String database;

    @Value("${bigquery.table}")
    private String table;

    @Value("${bigquery.state.code}")
    private String stateCode;

    @Value("${bigquery.height}")
    private String height;

    @Value("${bigquery.specie.code}")
    private String specieCode;

    public String getKeyPath() {
        return keyPath;
    }

    public void setKeyPath(String keyPath) {
        this.keyPath = keyPath;
    }

    public String getProjectId() {
        return projectId;
    }

    public void setProjectId(String projectId) {
        this.projectId = projectId;
    }

    public String getYearLabel() {
        return yearLabel;
    }

    public void setYearLabel(String yearLabel) {
        this.yearLabel = yearLabel;
    }

    public String getQuantityLabel() {
        return quantityLabel;
    }

    public void setQuantityLabel(String quantityLabel) {
        this.quantityLabel = quantityLabel;
    }

    public String getDatabase() {
        return database;
    }

    public void setDatabase(String database) {
        this.database = database;
    }

    public String getTable() {
        return table;
    }

    public void setTable(String table) {
        this.table = table;
    }

    public String getStateCode() {
        return stateCode;
    }

    public void setStateCode(String stateCode) {
        this.stateCode = stateCode;
    }

    public String getHeight() {
        return height;
    }

    public void setHeight(String height) {
        this.height = height;
    }

    public String getSpecieCode() {
        return specieCode;
    }

    public void setSpecieCode(String specieCode) {
        this.specieCode = specieCode;
    }
}
