package com.seb_pre_007.Server.question.controller;

import com.seb_pre_007.Server.question.dto.QuestionVoteResponseDto;
import com.seb_pre_007.Server.question.service.QuestionVoteService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/questions")
@RequiredArgsConstructor
public class QuestionVoteController {

    private QuestionVoteService questionVoteService;

    @PostMapping("/{question-id}/like")
    public ResponseEntity voteLike(Authentication authentication,
                                   @PathVariable("question-id") Long questionId) {
        // 유저정보 가져오고,
        String userEmail = authentication.getPrincipal().toString();
        QuestionVoteResponseDto response = questionVoteService.voteLike(userEmail, questionId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/{question-id}/dislike")
    public ResponseEntity voteDisLike(Authentication authentication,
                                   @PathVariable("question-id") Long questionId) {
        // 유저정보 가져오고,
        String userEmail = authentication.getPrincipal().toString();
        QuestionVoteResponseDto response = questionVoteService.voteDisLike(userEmail, questionId);

        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
