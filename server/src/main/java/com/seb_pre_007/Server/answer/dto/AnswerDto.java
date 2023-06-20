package com.seb_pre_007.Server.answer.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerDto {
    private Long answerId;
    private String answer_content;
    private String answer_created_at;
    private String answer_updated_at;
    private Long userId;
    private Long questionId;
}
