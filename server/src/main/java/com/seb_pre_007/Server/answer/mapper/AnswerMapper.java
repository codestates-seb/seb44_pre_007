package com.seb_pre_007.Server.answer.mapper;

import com.seb_pre_007.Server.answer.dto.AnswerPostDto;
import com.seb_pre_007.Server.answer.dto.AnswerVoteResponseDto;
import com.seb_pre_007.Server.answer.entity.Answer;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel =  "spring")
public interface AnswerMapper {

    Answer answerPostToAnswer(AnswerPostDto requestBody);

    Object answerToAnswerResponseDto(Answer answer);

    @Mapping(source = "answerVoteCount", target = "voteCount")
    AnswerVoteResponseDto answerToAnswerVoteResponseDto(Answer answer);
}
