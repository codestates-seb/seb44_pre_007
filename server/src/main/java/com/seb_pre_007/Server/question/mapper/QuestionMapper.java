package com.seb_pre_007.Server.question.mapper;

import com.seb_pre_007.Server.answer.dto.AnswerResponseDto;
import com.seb_pre_007.Server.answer.entity.Answer;
import com.seb_pre_007.Server.question.dto.QuestionData;
import com.seb_pre_007.Server.question.dto.QuestionDetailResponseDto;
import com.seb_pre_007.Server.question.dto.QuestionResponseDto;
import com.seb_pre_007.Server.question.dto.QuestionPostDto;
import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.tag.dto.TagDto;
import com.seb_pre_007.Server.tag.entity.Tag;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingConstants;

import java.util.List;
import java.util.stream.Collectors;

@Mapper(componentModel = MappingConstants.ComponentModel.SPRING)
public interface QuestionMapper {

    TagDto tagToTagDto(Tag tag);
    List<TagDto> tagsToTagDtos(List<Tag> tags);

    default QuestionData qeustionToQuestionData(Question question) {

        return QuestionData.builder()
                .questionUserNickname(question.getUser().getUserNickname())
                .questionId(question.getQuestionId())
                .questionTitle(question.getQuestionTitle())
                .questionContent(question.getQuestionContent())
                .questionCreated(question.getQuestionCreated())
                .questionUpdated(question.getQuestionUpdated())
                .questionCount(question.getQuestionCount())
                .answerCount(question.getAnswerCount())
                .tagList(question.getQuestionTagList().stream()
                        .map(questionTag -> new TagDto(questionTag.getTag().getTagId(), questionTag.getTag().getTagName()))
                        .collect(Collectors.toList())
                ).build();
    }
    List<QuestionData> questionsToQuestionDatas(List<Question> questions);


    QuestionDetailResponseDto qeustionToResponseDto(Question question);

    @Mapping(source = "user.userNickname", target = "answerUserNickname")
    AnswerResponseDto  answerToResponseDto(Answer answer);

    List<AnswerResponseDto> answerListToResponseDto(List<Answer> answerList);



    Question questionPostDtoToQuestion(QuestionPostDto questionPostDto);

    QuestionPostDto questionToQuestionResponse(Question question);




}
