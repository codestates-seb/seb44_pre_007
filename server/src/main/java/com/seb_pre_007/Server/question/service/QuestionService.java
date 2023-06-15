package com.seb_pre_007.Server.question.service;

import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Page<Question> findQuestions(int page, int limit) {

//        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));

        return questionRepository.findAll(PageRequest.of(page, limit, Sort.by("questionCreated").descending()));
    }
}
