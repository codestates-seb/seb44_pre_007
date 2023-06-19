package com.seb_pre_007.Server.user.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long userId;

    @Column(nullable = false, updatable = false)
    private String userEmail;

    @Column
    private String userPassword;

    @Column(nullable = false)
    private String userNickname;

    @Column
    private String imgURL;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    public User(String email, String nickname, String imgURL) {
        this.userEmail = email;
        this.userNickname = nickname;
        this.imgURL = imgURL;
    }
}
