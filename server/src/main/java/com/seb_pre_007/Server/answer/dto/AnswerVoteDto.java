package com.seb_pre_007.Server.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
public class AnswerVoteDto {




    private Long userId;
    private Long answerId;

    private String voteType; // Like, Dislike;
}
