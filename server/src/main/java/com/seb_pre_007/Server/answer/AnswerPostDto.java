package com.seb_pre_007.Server.answer;

import com.seb_pre_007.Server.vaildator.NotSpace;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import java.util.List;

public class AnswerPostDto {

    private String userId;

    @NotBlank(message = "답변 내용을 적어주세요")
    private String answerContent;

}
