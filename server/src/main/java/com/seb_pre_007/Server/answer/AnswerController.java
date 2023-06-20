package com.seb_pre_007.Server.answer;

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

    public AnswerController(AnswerService answerService, AnswerMapper answerMapper,
                            QuestionRepository questionRepository) {
        this.answerService = answerService;
        this.answerMapper = answerMapper;
        this.questionRepository = questionRepository;
    }

    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@PathVariable("question-id") @Positive long questionId,
                                     @Valid @RequestBody AnswerPostDto answerPostDto, Authentication authentication){

        String userEmail = authentication.getPrincipal().toString();

        Question targetQuestion = questionRepository.findByQuestionId(questionId);
        Answer answer = answerService.createAnswer(targetQuestion, answerPostDto, userEmail);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/questions/" + questionId));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
//        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}/edit_answer")
    public ResponseEntity patchAnswer(@Positive @PathVariable("answer-id") long answerId,
                                      @Valid @RequestBody AnswerPatchDto answerPatchDto, Authentication authentication){

        String userEmail = authentication.getPrincipal().toString();

        answerPatchDto.setAnswerId(answerId);
        Question targetQuestion = questionRepository.findByQuestionId(answerId);
        Answer answer = answerService.updateAnswer(targetQuestion, answerPatchDto, userEmail);

        HttpHeaders headers = new HttpHeaders();
        headers.setLocation(URI.create("/questions/" + targetQuestion.getQuestionId()));
        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
    }

    @DeleteMapping("/{answer-id}/edit_answer")
    public ResponseEntity deleteAnswer(@Positive @PathVariable("answer-id") long answerId, Authentication authentication){

        String userEmail = authentication.getPrincipal().toString();

        answerService.deleteAnswer(answerId, userEmail);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
