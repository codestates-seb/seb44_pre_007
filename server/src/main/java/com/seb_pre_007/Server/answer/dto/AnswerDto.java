package com.seb_pre_007.Server.answer.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AnswerDto {
    //답변 id
    private Long answerId;
    //답변 내용
    private String answer_content;
    //답변 생성 시간
    private String answer_created_at;
    //답변 수정 시간
    private String answer_updated_at;
    //답변을 단 userid
    private Long userId;
    //답변을 단 questionid
    private Long questionId;
}
