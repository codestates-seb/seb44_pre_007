package com.seb_pre_007.Server.answer.entity;

import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.entity.QuestionVote;
import com.seb_pre_007.Server.user.entity.User;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AnswerVote {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        private Long answerVoteId;

        @ManyToOne
        @JoinColumn(name = "answer_id")
        private Answer answer;

        @ManyToOne
        @JoinColumn(name = "user_id")
        private User user;

        @Column
        @Enumerated(EnumType.STRING)
        private VoteType voteType;


        public AnswerVote(Answer answer, User user, VoteType voteType) {
                this.answer = answer;
                this.user = user;
                this.voteType = voteType;
        }
        public enum VoteType {
            LIKE, DISLIKE;
        }
    }
