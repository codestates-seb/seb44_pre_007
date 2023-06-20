package com.seb_pre_007.Server.answer.dto;

import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

/*
* “answers”: [
         {
            “answerId”: Number(답변ID),
            “answerUserNickname”: String(답변작성자닉네임),
            “answerContent”: String(답변내용),
            “answerCreated”: String(답변등록일자),
            “answerUpdated”: String(답변수정일자)
         }
    ]
*
* */
@Getter
public class AnswerResponseDto {

    private long answerId;

    private String answerUserNickname;

    private String answerContent;

    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
    private LocalDateTime answerCreated;

    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
    private LocalDateTime answerUpdated;


}
