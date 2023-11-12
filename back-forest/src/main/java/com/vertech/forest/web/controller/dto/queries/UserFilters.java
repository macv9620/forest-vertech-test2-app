package com.vertech.forest.web.controller.dto.queries;

import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class UserFilters {
    private List<Integer> stateCode;
    private List<Integer> inventoryYear;
    private List<Integer> treeHeight;
    private List<Integer> specieCode;

    public List<Integer> getStateCode() {
        return stateCode;
    }

    public void setStateCode(List<Integer> stateCode) {
        this.stateCode = stateCode;
    }

    public List<Integer> getInventoryYear() {
        return inventoryYear;
    }

    public void setInventoryYear(List<Integer> inventoryYear) {
        this.inventoryYear = inventoryYear;
    }

    public List<Integer> getTreeHeight() {
        return treeHeight;
    }

    public void setTreeHeight(List<Integer> treeHeight) {
        this.treeHeight = treeHeight;
    }

    public List<Integer> getSpecieCode() {
        return specieCode;
    }

    public void setSpecieCode(List<Integer> specieCode) {
        this.specieCode = specieCode;
    }

    @Override
    public String toString() {
        return "Filters{" +
                "stateCode=" + stateCode +
                ", inventoryYear=" + inventoryYear +
                ", treeHeight=" + treeHeight +
                ", specieCode=" + specieCode +
                '}';
    }
}
