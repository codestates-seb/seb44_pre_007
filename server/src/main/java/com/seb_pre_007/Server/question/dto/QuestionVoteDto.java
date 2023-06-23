package com.seb_pre_007.Server.question.dto;

import lombok.Data;

@Data
public class QuestionVoteDto {

    private Long userId;
    private Long questionId;

    private String voteType; // Like, Dislike;
}
