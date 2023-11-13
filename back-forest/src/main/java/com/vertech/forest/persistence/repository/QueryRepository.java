package com.vertech.forest.persistence.repository;

import com.vertech.forest.persistence.entity.QueryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QueryRepository extends JpaRepository<QueryEntity, Integer> {

}
