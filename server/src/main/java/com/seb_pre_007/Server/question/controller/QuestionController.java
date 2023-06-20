package com.seb_pre_007.Server.question.controller;

import com.seb_pre_007.Server.answer.dto.AnswerResponseDto;
import com.seb_pre_007.Server.question.dto.QuestionData;
import com.seb_pre_007.Server.question.dto.QuestionDetailResponseDto;
import com.seb_pre_007.Server.question.dto.QuestionResponseDto;
import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.entity.QuestionTag;
import com.seb_pre_007.Server.question.mapper.QuestionMapper;
import com.seb_pre_007.Server.question.service.QuestionService;
import com.seb_pre_007.Server.tag.dto.TagDto;
import com.seb_pre_007.Server.user.entity.User;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    @GetMapping
    public ResponseEntity getQuestions(@Positive @RequestParam int page,
                                       @Positive @RequestParam int limit) {

        Page<Question> pageQuestions = questionService.findQuestions(page - 1, limit);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(
                new QuestionResponseDto(questionMapper.questionsToQuestionDatas(questions), pageQuestions),
                HttpStatus.OK);
    }

    //tag로 일반검색
    @GetMapping("/tagged/{question-tag}")
    public ResponseEntity getQuestionsSearch( @PathVariable("question-tag")  String questionTag,
                                              @RequestParam(required = false) Integer page,
                                              @RequestParam(required = false) Integer limit){

        System.out.println("페이지값:"+page);

        if(page==null) page=1;
        if(limit==null) limit=10;

        System.out.println("페이지값:"+page);

        Page<Question> pageQuestions= questionService.findQuestionSearch(questionTag,page-1,limit);
        List<Question> questions = pageQuestions.getContent();


        return new ResponseEntity<>(
                new QuestionResponseDto(questionMapper.questionsToQuestionDatas(questions),pageQuestions),
                HttpStatus.OK);



    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId){


        Question question= questionService.findeQuestion(questionId);

        QuestionData questionData= questionMapper.qeustionToQuestionData(question);

        QuestionDetailResponseDto questionResponseDto= questionMapper.qeustionToResponseDto(question);

        questionResponseDto.setQuestionUserNickname(questionData.getQuestionUserNickname());
        questionResponseDto.setTagList(questionData.getTagList());

        System.out.println("유저 닉네임"+question.getAnswerList());

         return new ResponseEntity(questionResponseDto, HttpStatus.OK);


    }
}

