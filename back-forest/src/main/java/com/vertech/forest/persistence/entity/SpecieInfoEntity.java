package com.vertech.forest.persistence.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "species")
public class SpecieInfoEntity {
    @Id
    @Column(name = "specie_code")
    private int specieCode;

    @Column(name = "specie_name")
    private String specieName;

    public int getSpecieCode() {
        return specieCode;
    }

    public void setSpecieCode(int specieCode) {
        this.specieCode = specieCode;
    }

    public String getSpecieName() {
        return specieName;
    }

    public void setSpecieName(String specieName) {
        this.specieName = specieName;
    }
}
