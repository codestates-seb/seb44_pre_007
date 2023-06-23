package com.seb_pre_007.Server.answer.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

@Data
@Builder
public class AnswerResponseDto {

    private long answerId;

    private String answerUserNickname;

    private String answerContent;

    private String answerVoteCount;

    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
    private LocalDateTime answerCreated;

    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
    private LocalDateTime answerUpdated;

}
