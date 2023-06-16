package com.seb_pre_007.Server.question.entity;

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

    @Column
    private String questionContent;

    @Column
    private int questionCount;

    @Column
    private int answerCount;

    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
    private LocalDateTime questionCreated;

    @LastModifiedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
    private LocalDateTime questionUpdated;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @OneToMany(mappedBy = "question")
    @BatchSize(size = 50)
    private List<QuestionTag> questionTagList = new ArrayList<>();
}
