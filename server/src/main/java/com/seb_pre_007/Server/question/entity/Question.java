package com.seb_pre_007.Server.question.entity;

import com.seb_pre_007.Server.answer.entity.Answer;
import com.seb_pre_007.Server.user.entity.User;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.BatchSize;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
@EntityListeners(AuditingEntityListener.class)
public class Question {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionId;

    @Column
    private String questionTitle;

    @Column(columnDefinition = "TEXT")
    private String questionContent;

    @Column
    private int questionCount;

    @Column
    private int answerCount;

    @Column
    private int questionVoteCount;

    private String questionVoteStatus;

    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
    private LocalDateTime questionCreated;

//    @LastModifiedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
    private LocalDateTime questionUpdated;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @BatchSize(size = 100)
    private List<QuestionTag> questionTagList = new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @BatchSize(size = 100)
    private List<Answer> answerList= new ArrayList<>();

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL)
    @BatchSize(size = 100)
    private List<QuestionVote> questionVoteList = new ArrayList<>();

    // Question - QuestionTag 양방향 매핑 편의 메소드
    public void addQuestionTag(QuestionTag questionTag) {
        // Question.questionTagList 에 파라미터로 전달받은 QuestionTag가 없을 경우에만 추가
        if (!this.getQuestionTagList().contains(questionTag)) {
            this.getQuestionTagList().add(questionTag);
        }
        // 파라미터로 전달된 QuestionTag 에 Question 이 매핑되어 있지 않다면 연관관계 추가
        if (questionTag.getQuestion() != this) {
            questionTag.setQuestion(this);
        }
    }
}
