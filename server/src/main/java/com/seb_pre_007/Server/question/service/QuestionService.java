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

import javax.validation.constraints.Positive;
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
            return new PageImpl<>(new ArrayList<>());
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


    @Transactional
    public Question updateQuestion(QuestionPatchDto questionPatchDto, String userEmail) {

        Question findQuestion = findVerifiedQuestion(questionPatchDto.getQuestionId()); // 질문글 확인
        verifyUser(userEmail, findQuestion); // 작성자 여부 확인

        // 입력된 태그 값이 있을 때만 수정
        if (questionPatchDto.getQuestionTag() != null) {

            // 기존 태그-질문 정보 삭제
            questionTagService.deleteQuestionTags(findQuestion);
            findQuestion.setQuestionTagList(new ArrayList<>());

            // 입력된 태그가 null 이 아니고  태그 연관관계 세팅
            if (!questionPatchDto.getQuestionTag().isEmpty()) {
                setTagListToFindQuestion(questionPatchDto, findQuestion);
            }
        }

        Optional.ofNullable(questionPatchDto.getQuestionTitle()).ifPresent(findQuestion::setQuestionTitle);
        Optional.ofNullable(questionPatchDto.getQuestionContent()).ifPresent(findQuestion::setQuestionContent);

        return questionRepository.save(findQuestion);
    }

    // 태그-질문 연관관계 세팅
    private void setTagListToFindQuestion(QuestionPatchDto questionPatchDto, Question findQuestion) {
        List<String> inputTags = questionPatchDto.getQuestionTag().stream()
                .map(String::toUpperCase)
                .collect(Collectors.toList());

        for (int i = 0; i < inputTags.size(); i++) {
            Tag findTag = tagService.findByTagName(inputTags.get(i));
            if (findTag == null) findTag = tagService.createTag(inputTags.get(i));
            findQuestion.addQuestionTag(new QuestionTag(findTag));
        }
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

        if (questionPostDto.getQuestionTag() != null) {
            List<String> inputTags = questionPostDto.getQuestionTag().stream().map(inputTag -> inputTag.toUpperCase()).collect(Collectors.toList());

            // 태그 정보 조회 및 연관관계 설정
            for (int i = 0; i < inputTags.size(); i++) {
                Tag findTag = tagService.findByTagName(inputTags.get(i));
                if (findTag == null) findTag = tagService.createTag(inputTags.get(i));
                question.addQuestionTag(new QuestionTag(findTag));
            }
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
