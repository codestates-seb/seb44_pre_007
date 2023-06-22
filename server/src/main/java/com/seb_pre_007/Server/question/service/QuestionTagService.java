package com.seb_pre_007.Server.question.service;


import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.entity.QuestionTag;
import com.seb_pre_007.Server.question.repository.QuestionTagRepository;
import com.seb_pre_007.Server.tag.entity.Tag;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionTagService {

    private final QuestionTagRepository questionTagRepository;


    public QuestionTagService(QuestionTagRepository questionTagRepository) {
        this.questionTagRepository = questionTagRepository;
    }

    public List<QuestionTag> questionTags(Tag tag){

        return  questionTagRepository.findByTag(tag);
    }

    public void deleteQuestionTags(Question question) {
        questionTagRepository.deleteAllByQuestion(question);
    }


}
