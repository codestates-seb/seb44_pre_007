package com.seb_pre_007.Server.question.service;

import com.seb_pre_007.Server.exception.BusinessLogicException;
import com.seb_pre_007.Server.exception.ExceptionCode;
import com.seb_pre_007.Server.question.dto.QuestionPatchDto;
import com.seb_pre_007.Server.question.dto.QuestionPostDto;
import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.entity.QuestionTag;
import com.seb_pre_007.Server.question.repository.QuestionRepository;
import com.seb_pre_007.Server.tag.entity.Tag;
import com.seb_pre_007.Server.tag.service.TagService;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.service.UserService;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final TagService tagService;
    private final  QuestionTagService questionTagService;
    private final UserService userService;

    public QuestionService(QuestionRepository questionRepository, TagService tagService, QuestionTagService questionTagService, UserService userService) {
        this.questionRepository = questionRepository;
        this.tagService = tagService;
        this.questionTagService = questionTagService;
        this.userService = userService;
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
    public Question updateQuestion(QuestionPatchDto questionPatchDto, String userEmail) {
        // 존재하는 질문 여부 검증
        Question findQuestion = findVerifiedQuestion(questionPatchDto.getQuestionId());

        // 현재 로그인한 유저가 해당 질문의 작성자인지 검증
        verifyUser(userEmail, findQuestion);

        // 기존 태그-질문 정보 삭제 (전달받은 태그 정보로 다시 등록해야 하므로)
        questionTagService.deleteQuestionTags(findQuestion);
        findQuestion.setQuestionTagList(new ArrayList<>());

        // 입력받은 태그리스트
        List<String> inputTags = questionPatchDto.getQuestionTag().stream()
                .map(inputTag -> inputTag.toUpperCase())
                .collect(Collectors.toList());

        // 태그 정보 조회 및 연관관계 설정
        for (int i = 0; i < inputTags.size(); i++) {
            Tag findTag = tagService.findByTagName(inputTags.get(i));
            if (findTag == null) findTag = tagService.createTag(inputTags.get(i));
            findQuestion.addQuestionTag(new QuestionTag(findTag));
        }

        // 입력받은 title, content로 재설정
        findQuestion.setQuestionTitle(questionPatchDto.getQuestionTitle());
        findQuestion.setQuestionContent(questionPatchDto.getQuestionContent());

        return questionRepository.save(findQuestion);
    }

    private void verifyUser(String userEmail, Question findQuestion) {
        if (!findQuestion.getUser().getUserEmail().equals(userEmail)) {
            throw new BusinessLogicException(ExceptionCode.USER_DOES_NOT_MATCH);
        }
    }

    private Question findVerifiedQuestion(Long questionId) {
        Optional<Question> quesiton = questionRepository.findById(questionId);

        return quesiton.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }



    @Transactional
    public Question createQuestion(QuestionPostDto questionPostDto, String userEmail) {

       User findUser = userService.getUser(userEmail);

        Question question = new Question();
        question.setUser(findUser);
        question.setQuestionTitle(questionPostDto.getQuestionTitle());
        question.setQuestionContent(questionPostDto.getQuestionContent());

        List<String> inputTags = questionPostDto.getQuestionTag().stream().map(inputTag -> inputTag.toUpperCase()).collect(Collectors.toList());

        // 태그 정보 조회 및 연관관계 설정
        for (int i = 0; i < inputTags.size(); i++) {
            Tag findTag = tagService.findByTagName(inputTags.get(i));
            if (findTag == null) findTag = tagService.createTag(inputTags.get(i));
            question.addQuestionTag(new QuestionTag(findTag));
        }

        return questionRepository.save(question);
    }

    @Transactional
    public void deleteQuestion(long questionId, String userEmail){
        Question findQuestion = findVerifiedQuestion(questionId);
        verifyUser(userEmail, findQuestion);

        questionRepository.delete(findQuestion);

    }
}
