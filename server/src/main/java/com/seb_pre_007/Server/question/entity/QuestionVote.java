package com.seb_pre_007.Server.question.entity;

import com.seb_pre_007.Server.user.entity.User;

import javax.persistence.*;

@Entity
public class QuestionVote {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionVoteId;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

}
