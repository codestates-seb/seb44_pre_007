package com.seb_pre_007.Server.answer;

import org.mapstruct.Mapper;

@Mapper(componentModel =  "spring")
public interface AnswerMapper {

    Answer answerPostToAnswer(AnswerPostDto requestBody);

    Object answerToAnswerResponseDto(Answer answer);
}
