package com.seb_pre_007.Server.question.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class QuestionVoteResponseDto {

    private Long questionId;
    private Integer voteCount;

}
