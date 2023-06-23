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


    // 질문 생성
    @PostMapping("/ask")
    public ResponseEntity postQuestion(@Valid @RequestBody QuestionPostDto questionPostDto,
                                       Authentication authentication) {

        String userEmail = authentication.getPrincipal().toString(); // 로그인된 유저 정보 가져오기

        Question createdQuestion = questionService.createQuestion(questionPostDto, userEmail); // 생성한 질문

        // 응답 헤더에 리소스 위치 추가
        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/questions/" + createdQuestion.getQuestionId()));

        return new ResponseEntity<>(headers, HttpStatus.CREATED);
    }

    // 질문 전체 조회 (리스트 반환)
    @GetMapping
    public ResponseEntity getQuestions(@Positive @RequestParam int page,
                                       @Positive @RequestParam int limit) {

        // DB 에서 Paging 처리해서 조회한 질문 리스트 가져오기
        Page<Question> pageQuestions = questionService.findQuestions(page - 1, limit); // 페이지 인덱스 0부터 시작하므로 page - 1 전달
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(
                new QuestionResponseDto(questionMapper.questionsToQuestionDatas(questions), pageQuestions),
                HttpStatus.OK);
    }

    // tag로 질문 검색 (리스트 반환)
    @GetMapping("/tagged/{question-tag}")
    public ResponseEntity getQuestionsSearch(@PathVariable("question-tag") String questionTag,
                                             @RequestParam(required = false) @Positive Integer page,
                                             @RequestParam(required = false) @Positive Integer limit) {
        // query parameter 가 옵션이므로 미입력시 default 값 지정
        if (page == null) page = 1;
        if (limit == null) limit = 10;

        // DB 에서 Paging 처리해서 조회한 질문 리스트 가져오기
        Page<Question> pageQuestions = questionService.findQuestionSearch(questionTag, page - 1, limit);
        List<Question> questions = pageQuestions.getContent();

        return new ResponseEntity<>(
                new QuestionResponseDto(questionMapper.questionsToQuestionDatas(questions), pageQuestions),
                HttpStatus.OK);
    }


    // 질문 상세 조회
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @Positive long questionId) {

        Question question = questionService.findQuestion(questionId); // questionId를 통해 조회한 Question

        // Question -> QuestionResponseDto 로 변환 (start)
        QuestionData questionData = questionMapper.qeustionToQuestionData(question);
        QuestionDetailResponseDto questionResponseDto = questionMapper.qeustionToResponseDto(question);
        questionResponseDto.setQuestionUserNickname(questionData.getQuestionUserNickname());
        questionResponseDto.setTagList(questionData.getTagList());

        return new ResponseEntity(questionResponseDto, HttpStatus.OK);
    }

    // 질문 수정
    @PatchMapping("/{question-id}/edit")
    public ResponseEntity patchQuestion(@Positive @PathVariable("question-id") long questionId,
                                        @Valid @RequestBody QuestionPatchDto questionPatchDto,
                                        Authentication authentication) {

        String userEmail = authentication.getPrincipal().toString(); // 로그인된 유저 정보 가져오기

        questionPatchDto.setQuestionId(questionId);
        questionService.updateQuestion(questionPatchDto, userEmail); // Question 수정

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 질문 삭제
    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(@PathVariable("question-id") @Positive long questionId,
                                         Authentication authentication) {

        String userEmail = authentication.getPrincipal().toString(); // 로그인된 유저 정보 가져오기

        questionService.deleteQuestion(questionId, userEmail); // Question 삭제

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }


}