package com.seb_pre_007.Server.answer;

import lombok.Data;


@Data
public class AnswerPatchDto {

    private Long answerId;

    private Long questionId;

    private String answerContent;

}
