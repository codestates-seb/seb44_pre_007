package com.seb_pre_007.Server.question.controller;

import com.seb_pre_007.Server.answer.dto.AnswerResponseDto;
import com.seb_pre_007.Server.question.dto.QuestionData;
import com.seb_pre_007.Server.question.dto.QuestionDetailResponseDto;
import com.seb_pre_007.Server.question.dto.QuestionPatchDto;
import com.seb_pre_007.Server.question.dto.QuestionPostDto;
import com.seb_pre_007.Server.question.dto.QuestionResponseDto;
import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.mapper.QuestionMapper;
import com.seb_pre_007.Server.question.service.QuestionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
@Validated
public class QuestionController {

    private final QuestionService questionService;
    private final QuestionMapper questionMapper;

    // 질문 리스트 조회
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
    public ResponseEntity getQuestionsSearch(@PathVariable("question-tag") String questionTag,
                                             @RequestParam(required = false) @Positive Integer page,
                                             @RequestParam(required = false) @Positive Integer limit) {


        System.out.println("페이지값:" + page);

        if (page == null) page = 1;
        if (limit == null) limit = 10;

        System.out.println("페이지값:" + page);

        Page<Question> pageQuestions = questionService.findQuestionSearch(questionTag, page - 1, limit);
        List<Question> questions = pageQuestions.getContent();


        return new ResponseEntity<>(
                new QuestionResponseDto(questionMapper.questionsToQuestionDatas(questions), pageQuestions),
                HttpStatus.OK);
    }


    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId) {


        Question question = questionService.findeQuestion(questionId);

        QuestionData questionData = questionMapper.qeustionToQuestionData(question);

        QuestionDetailResponseDto questionResponseDto = questionMapper.qeustionToResponseDto(question);

        questionResponseDto.setQuestionUserNickname(questionData.getQuestionUserNickname());
        questionResponseDto.setTagList(questionData.getTagList());

        List<AnswerResponseDto> sortedList= questionResponseDto.getAnswerList().stream()
                .sorted(Comparator.comparing(AnswerResponseDto::getAnswerUpdated).reversed())
                .collect(Collectors.toList());

         questionResponseDto.setAnswerList(sortedList);

        return new ResponseEntity(questionResponseDto, HttpStatus.OK);


    }


    // 질문 수정
    @PatchMapping("/{question-id}/edit")
    public ResponseEntity patchQuestion(@Positive @PathVariable("question-id") long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto,
                                        Authentication authentication) {

        String userEmail = authentication.getPrincipal().toString();

        questionPatchDto.setQuestionId(questionId);
        Question question = questionService.updateQuestion(questionPatchDto, userEmail);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/questions/" + questionId));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    // 질문 생성
    @PostMapping("/ask")
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto, Authentication authentication) {

        String userEmail = authentication.getPrincipal().toString();

        Question createdQuestion = questionService.createQuestion(questionPostDto, userEmail);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/questions/" + createdQuestion.getQuestionId()));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
        // redirect 미구현시     return ResponseEntity.status(HttpStatus.CREATED).body(null);
    }

    // 질문 삭제
    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId, Authentication authentication) {

        String userEmail = authentication.getPrincipal().toString();

        questionService.deleteQuestion(questionId, userEmail);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}