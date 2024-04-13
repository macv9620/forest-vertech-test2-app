package com.vertech.forest.persistence.entity;

import autovalue.shaded.org.jetbrains.annotations.NotNull;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;

import java.util.Date;
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

//    Validación
    @NotNull
    @Size(min = 3, max = 10, message = "Invalid size (min= 3 - max = 10)")
    @Column(name = "query_name")
    private String queryName;

    @Column(name = "query_json")
    private String queryJson;

    //    Validación
    @NotNull
    @Size(min = 14, max = 50, message = "Invalid size (min= 14 - max = 50)")
    @Column(name = "query_description")
    private String queryDescription;

    @Temporal(TemporalType.TIMESTAMP)
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "nickName", referencedColumnName = "nickName", insertable = false, updatable = false)
    private UserEntity user;

    @OneToMany(mappedBy = "query")
    private List<QueryCommentEntity> comments;

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

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public List<QueryCommentEntity> getComments() {
        return comments;
    }

    public void setComments(List<QueryCommentEntity> comments) {
        this.comments = comments;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
