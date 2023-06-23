package com.seb_pre_007.Server.answer.controller;

import com.seb_pre_007.Server.answer.dto.AnswerVoteDto;
import com.seb_pre_007.Server.answer.dto.AnswerVoteResponseDto;
import com.seb_pre_007.Server.answer.entity.AnswerVote;
import com.seb_pre_007.Server.answer.repository.AnswerVoteRepository;
import com.seb_pre_007.Server.answer.service.AnswerVoteService;
import com.seb_pre_007.Server.question.dto.QuestionVoteResponseDto;
import com.seb_pre_007.Server.question.service.QuestionVoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/answers")
@RequiredArgsConstructor
public class AnswerVoteController {
    private final AnswerVoteService answerVoteService;


    @PostMapping("/{answer-id}/like")
    public ResponseEntity voteLike(Authentication authentication,
                                   @PathVariable("answer-id") Long answerId) {

        String userEmail = authentication.getPrincipal().toString();
        AnswerVoteResponseDto response = answerVoteService.voteLike(userEmail, answerId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/{answer-id}/dislike")
    public ResponseEntity voteDisLike(Authentication authentication,
                                      @PathVariable("answer-id") Long answerId) {

        String userEmail = authentication.getPrincipal().toString();
        AnswerVoteResponseDto response = answerVoteService.voteDisLike(userEmail, answerId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
