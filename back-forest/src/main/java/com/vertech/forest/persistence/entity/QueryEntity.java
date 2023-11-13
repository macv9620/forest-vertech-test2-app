package com.vertech.forest.persistence.entity;

import autovalue.shaded.org.jetbrains.annotations.NotNull;
import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "queries")
public class QueryEntity {
    @Id
    @Column(name = "query_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer queryId;

    @Column(nullable = false)
    private String nickName;

    @Column(name = "query_name")
    private String queryName;

    @Column(name = "query_json")
    private String queryJson;

    @Column(name = "query_description")
    private String queryDescription;

    @ManyToOne
    @JoinColumn(name = "nickName", referencedColumnName = "nickName", insertable = false, updatable = false)
    private UserEntity user;

    @OneToMany(mappedBy = "query")
    private List<QueryCommentEntity> queries;

    public Integer getQueryId() {
        return queryId;
    }

    public void setQueryId(Integer queryId) {
        this.queryId = queryId;
    }

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getQueryName() {
        return queryName;
    }

    public void setQueryName(String queryName) {
        this.queryName = queryName;
    }

    public String getQueryJson() {
        return queryJson;
    }

    public void setQueryJson(String queryJson) {
        this.queryJson = queryJson;
    }

    public String getQueryDescription() {
        return queryDescription;
    }

    public void setQueryDescription(String queryDescription) {
        this.queryDescription = queryDescription;
    }
}
