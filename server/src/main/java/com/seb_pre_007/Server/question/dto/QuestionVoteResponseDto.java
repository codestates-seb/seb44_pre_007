package com.seb_pre_007.Server.question.dto;

import lombok.Data;

@Data
public class QuestionVoteResponseDto {

    private Long questionId;
    private Integer voteCount;

}
