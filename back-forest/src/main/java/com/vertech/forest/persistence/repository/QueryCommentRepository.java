package com.vertech.forest.persistence.repository;

import com.vertech.forest.persistence.entity.QueryCommentEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QueryCommentRepository extends JpaRepository<QueryCommentEntity, Integer> {
}
