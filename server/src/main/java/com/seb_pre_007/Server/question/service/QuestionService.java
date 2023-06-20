package com.seb_pre_007.Server.question.service;

import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.entity.QuestionTag;
import com.seb_pre_007.Server.question.repository.QuestionRepository;
import com.seb_pre_007.Server.tag.entity.Tag;
import com.seb_pre_007.Server.tag.service.TagService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.Positive;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class QuestionService {

    private final QuestionRepository questionRepository;

    private final TagService tagService;

    private final  QuestionTagService questionTagService;

    public QuestionService(QuestionRepository questionRepository, TagService tagService, QuestionTagService questionTagService) {
        this.questionRepository = questionRepository;
        this.tagService = tagService;
        this.questionTagService = questionTagService;
    }


    public Page<Question> findQuestions(int page, int limit) {

//        return memberRepository.findAll(PageRequest.of(page, size, Sort.by("memberId").descending()));

        return questionRepository.findAll(PageRequest.of(page, limit, Sort.by("questionCreated").descending()));
    }

    public Page<Question> findQuestionSearch(@Positive String questionTag,int page, int limit) {

        Tag findTagName = tagService.findByTagName(questionTag);

        if(findTagName==null){
            return null;
        }

        List<QuestionTag> questionTagList = questionTagService.questionTags(findTagName);

        List<Question> questions = questionTagList.stream()
                .map(findQuestionTag -> findQuestionTag.getQuestion())
                .collect(Collectors.toList());

        PageRequest pageRequest= PageRequest.of(page,limit, Sort.by("questionCreated").descending());
        int start=(int)pageRequest.getOffset();
        int end=Math.min(start+pageRequest.getPageSize(),questions.size());

        Page<Question> questionPage= new PageImpl<>(questions.subList(start,end),pageRequest, questions.size());

        return  questionPage;

    }

    public Question findeQuestion(long questionId) {


        Question findQuestion = questionRepository.findByQuestionId(questionId);

        updateViewQuestions(findQuestion);

        return findQuestion;


    }

    @Transactional
    public void updateViewQuestions(Question findQuestion) {


        int questionCount= findQuestion.getQuestionCount();

        findQuestion.setQuestionCount(questionCount+1);

        questionRepository.save(findQuestion);


    }

}
