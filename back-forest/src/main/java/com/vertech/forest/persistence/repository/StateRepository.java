package com.vertech.forest.persistence.repository;

import com.vertech.forest.persistence.entity.StateInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StateRepository extends JpaRepository<StateInfoEntity, Integer> {
}
