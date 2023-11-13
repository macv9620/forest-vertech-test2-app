package com.vertech.forest.persistence.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    private String nickName;
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<QueryEntity> queries;

    @JsonIgnore
    @OneToMany(mappedBy = "user")
    private List<QueryCommentEntity> queriesComments;

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<QueryEntity> getQueries() {
        return queries;
    }

    public void setQueries(List<QueryEntity> queries) {
        this.queries = queries;
    }

    public List<QueryCommentEntity> getQueriesComments() {
        return queriesComments;
    }

    public void setQueriesComments(List<QueryCommentEntity> queriesComments) {
        this.queriesComments = queriesComments;
    }
}
