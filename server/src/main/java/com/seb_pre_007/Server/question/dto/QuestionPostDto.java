package com.seb_pre_007.Server.question.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Positive;
import java.util.List;


/**
 * 질문 생성 시 요청 데이터 형식
 */
@Getter
@AllArgsConstructor
public class QuestionPostDto {

    @NotBlank(message = "질문 내용을 적어주세요")
    private String questionContent;


    @NotBlank(message = "질문 제목을 적어주세요")
    private String questionTitle;

    private List<String> questionTag;

}
