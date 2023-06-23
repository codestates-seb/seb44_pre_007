package com.seb_pre_007.Server.question.entity;

import com.seb_pre_007.Server.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuestionVote {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionVoteId;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column
    @Enumerated(EnumType.STRING)
    private VoteType voteType;

    public QuestionVote(Question question, User user, VoteType voteType) {
        this.question = question;
        this.user = user;
        this.voteType = voteType;
    }

    @Getter
    public enum VoteType {
        LIKE, DISLIKE, NONE;
    }
}
