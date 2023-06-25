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
    private String userPassword; // 구글 로그인은 비밀번호를 입력받지 않기 때문에 nullable = true

    @Column(nullable = false)
    private String userNickname;

    @Column
    private String imgURL;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> roles = new ArrayList<>();

    @Column
    @Enumerated(EnumType.STRING)
    private UserStatus userStatus = UserStatus.ACTIVE;

    public enum UserStatus {
        ACTIVE, WITHDRAWAL
    }

    public User(String email, String nickname, String imgURL) {
        this.userEmail = email;
        this.userNickname = nickname;
        this.imgURL = imgURL;
    }
}
