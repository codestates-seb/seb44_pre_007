package com.seb_pre_007.Server.answer;

import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.repository.QuestionRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.net.URI;

@RestController
@RequestMapping("/question")
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
                                     @Valid @RequestBody AnswerPostDto answerPostDto){
        Question targetQuestion = questionRepository.findByQuestionId(questionId);
        Answer answer = answerService.createAnswer(targetQuestion, answerMapper.answerPostToAnswer(answerPostDto));

//        HttpHeaders headers = new HttpHeaders();
//        headers.setLocation(URI.create("/questions/" + questionId));
//        return new ResponseEntity<>(headers, HttpStatus.MOVED_PERMANENTLY);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
