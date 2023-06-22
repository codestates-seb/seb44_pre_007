package com.seb_pre_007.Server.answer.controller;

import com.seb_pre_007.Server.answer.mapper.AnswerMapper;
import com.seb_pre_007.Server.answer.service.AnswerService;
import com.seb_pre_007.Server.answer.dto.AnswerPatchDto;
import com.seb_pre_007.Server.answer.dto.AnswerPostDto;
import com.seb_pre_007.Server.answer.entity.Answer;
import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.repository.QuestionRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/questions")
public class AnswerController {

    private final AnswerService answerService;
    private final AnswerMapper answerMapper;
    private final QuestionRepository questionRepository;

    //service, mapper, repo DI주입
    public AnswerController(AnswerService answerService, AnswerMapper answerMapper,
                            QuestionRepository questionRepository) {
        this.answerService = answerService;
        this.answerMapper = answerMapper;
        this.questionRepository = questionRepository;
    }

    //답변 생성(post)
    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive long questionId,
                                     @Valid @RequestBody AnswerPostDto answerPostDto, Authentication authentication){

        //Authentication에서 현재 로그인한 사용자의 이메일을 가져옴
        String userEmail = authentication.getPrincipal().toString();

        //답변에 해당하는 질문 찾기
        Question targetQuestion = questionRepository.findByQuestionId(questionId);
        //질문의 answercount +1 해주기
        targetQuestion.setAnswerCount(targetQuestion.getAnswerCount()+1);
        questionRepository.save(targetQuestion);

        answerService.createAnswer(targetQuestion, answerPostDto, userEmail);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/questions/" + questionId));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    //답변 수정(patch)
    @PatchMapping("/{question-id}/{answer-id}/edit")
    public ResponseEntity patchAnswer(@Positive @PathVariable("question-id") long questionId,@Positive @PathVariable("answer-id") long answerId,
                                      @Valid @RequestBody AnswerPatchDto answerPatchDto, Authentication authentication){

        //Authentication에서 현재 로그인한 사용자의 이메일을 가져옴
        String userEmail = authentication.getPrincipal().toString();


        answerPatchDto.setAnswerId(answerId);
        questionRepository.findByQuestionId(questionId);
        answerService.updateAnswer(answerPatchDto, userEmail);

        //리다이렉트시 해당 페이지에서 요청을 한번 더 호출(patch)하기 때문에 클라이언트쪽에서 리다이렉트 처리
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //답변 삭제(delete)
    @DeleteMapping("/{question-id}/{answer-id}/edit")
    public ResponseEntity deleteAnswer(@Positive @PathVariable("question-id") long questionId, @Positive @PathVariable("answer-id") long answerId, Authentication authentication){

        String userEmail = authentication.getPrincipal().toString();

        //삭제 시 question에 있는 answercount를 -1 시켜준다음 저장
        Question targetQuestion = questionRepository.findByQuestionId(questionId);
        targetQuestion.setAnswerCount(targetQuestion.getAnswerCount()-1);
        questionRepository.save(targetQuestion);
        answerService.deleteAnswer(targetQuestion, answerId, userEmail);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
