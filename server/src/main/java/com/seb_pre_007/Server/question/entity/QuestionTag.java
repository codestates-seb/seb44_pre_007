package com.seb_pre_007.Server.question.entity;

import com.seb_pre_007.Server.tag.entity.Tag;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuestionTag {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionTagId;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JoinColumn(name = "tag_id")
    private Tag tag;

    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;

    public QuestionTag(Tag tag) {
        this.tag = tag;
        this.question = null;
    }
}
