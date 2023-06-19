package com.seb_pre_007.Server.question.service;

import com.seb_pre_007.Server.exception.BusinessLogicException;
import com.seb_pre_007.Server.exception.ExceptionCode;
import com.seb_pre_007.Server.question.dto.QuestionPatchDto;
import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.entity.QuestionTag;
import com.seb_pre_007.Server.question.repository.QuestionRepository;
import com.seb_pre_007.Server.tag.entity.Tag;
import com.seb_pre_007.Server.tag.service.TagService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
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
        return questionRepository.findAll(PageRequest.of(page, limit, Sort.by("questionCreated").descending()));
    }

    public Page<Question> findQuestionSearch(String questionTag,int page, int limit) {

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

    @Transactional
    public Question updateQuestion(QuestionPatchDto questionPatchDto) {

        Question findQuestion = findVerifiedQuestion(questionPatchDto.getQuestionId());

        questionTagService.deleteQuestionTags(findQuestion);
        findQuestion.setQuestionTagList(new ArrayList<>());

        List<String> inputTags = questionPatchDto.getQuestionTag();

        for (int i = 0; i < inputTags.size(); i++) {
            Tag findTag = tagService.findByTagName(inputTags.get(i));
            if (findTag == null) findTag = tagService.createTag(inputTags.get(i));
            findQuestion.addQuestionTag(new QuestionTag(findTag));
        }

        findQuestion.setQuestionTitle(questionPatchDto.getQuestionTitle());
        findQuestion.setQuestionContent(questionPatchDto.getQuestionContent());

        return questionRepository.save(findQuestion);
    }

    private Question findVerifiedQuestion(Long questionId) {
        Optional<Question> quesiton = questionRepository.findById(questionId);

        return quesiton.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }
}
