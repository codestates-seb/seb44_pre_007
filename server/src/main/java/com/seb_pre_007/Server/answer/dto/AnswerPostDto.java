package com.seb_pre_007.Server.answer.dto;

import com.seb_pre_007.Server.vaildator.NotSpace;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

@Getter
public class AnswerPostDto {

    private String userId;

    private int questionId;

    @NotBlank(message = "답변 내용을 적어주세요")
    private String answerContent;

}
