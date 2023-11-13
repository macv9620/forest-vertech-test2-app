package com.vertech.forest.persistence.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "query_comment")
public class QueryCommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "comment_id")
    private Integer commentId;

    private String comment;

    @Column(name = "nickName")
    private String commentNickName;

    @Column(name = "query_id")
    private Integer queryId;

    @ManyToOne
    @JoinColumn(name = "nickName", referencedColumnName = "nickName", insertable = false, updatable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "query_id", referencedColumnName = "query_id", insertable = false, updatable = false)
    private QueryEntity query;

    public Integer getCommentId() {
        return commentId;
    }

    public void setCommentId(Integer commentId) {
        this.commentId = commentId;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getCommentNickName() {
        return commentNickName;
    }

    public void setCommentNickName(String commentNickName) {
        this.commentNickName = commentNickName;
    }

    public Integer getQueryId() {
        return queryId;
    }

    public void setQueryId(Integer queryId) {
        this.queryId = queryId;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }

    public QueryEntity getQuery() {
        return query;
    }

    public void setQuery(QueryEntity query) {
        this.query = query;
    }
}
