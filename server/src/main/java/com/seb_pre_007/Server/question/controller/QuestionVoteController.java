package com.seb_pre_007.Server.question.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/questions")
public class QuestionVoteController {

    @PostMapping("/{question-id}/like")
    public ResponseEntity voteLike(Authentication authentication) {
        // 유저정보 가져오고,

        return null;
    }

    @PostMapping("/{question-id}/dislike")
    public ResponseEntity voteDisLike(Authentication authentication) {
        // 유저정보 가져오고,

        return null;
    }
}
