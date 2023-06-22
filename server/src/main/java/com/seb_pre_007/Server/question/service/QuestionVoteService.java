package com.seb_pre_007.Server.question.service;

import com.seb_pre_007.Server.question.dto.QuestionVoteResponseDto;
import com.seb_pre_007.Server.question.repository.QuestionVoteRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class QuestionVoteService {

    private final QuestionVoteRepository questionVoteRepository;

    public QuestionVoteResponseDto voteLike(String userEmail, Long questionId) {
        return null;
    }

    public QuestionVoteResponseDto voteDisLike(String userEmail, Long questionId) {
        return null;
    }
}
