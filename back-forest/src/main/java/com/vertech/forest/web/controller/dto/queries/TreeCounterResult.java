package com.vertech.forest.web.controller.dto.queries;

import org.springframework.stereotype.Component;

@Component
public class TreeCounterResult {
    private int inventoryYear;
    private int treeQuantity;

    public int getInventoryYear() {
        return inventoryYear;
    }

    public void setInventoryYear(int inventoryYear) {
        this.inventoryYear = inventoryYear;
    }

    public int getTreeQuantity() {
        return treeQuantity;
    }

    public void setTreeQuantity(int treeQuantity) {
        this.treeQuantity = treeQuantity;
    }
}
