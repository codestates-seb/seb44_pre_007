package com.seb_pre_007.Server.user.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @Column(nullable = false, updatable = false)
    private String userEmail;

    @Column
    private String userPassword;

    @Column(nullable = false)
    private String userNickname;


}
