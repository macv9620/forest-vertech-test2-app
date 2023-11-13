package com.vertech.forest.persistence.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "users")
public class UserEntity {
    @Id
    private String nickName;
    private String name;

    @OneToMany(mappedBy = "user")
    private List<QueryEntity> queries;

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
}
