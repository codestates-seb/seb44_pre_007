package com.seb_pre_007.Server.answer.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AnswerVoteResponseDto {

    private Long answerId;
    private Integer voteCount;
}
