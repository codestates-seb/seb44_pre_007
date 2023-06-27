package com.seb_pre_007.Server.question.service;

import com.seb_pre_007.Server.answer.entity.Answer;
import com.seb_pre_007.Server.answer.entity.AnswerVote;
import com.seb_pre_007.Server.answer.repository.AnswerVoteRepository;
import com.seb_pre_007.Server.exception.BusinessLogicException;
import com.seb_pre_007.Server.exception.ExceptionCode;
import com.seb_pre_007.Server.question.dto.QuestionPatchDto;
import com.seb_pre_007.Server.question.dto.QuestionPostDto;
import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.entity.QuestionTag;
import com.seb_pre_007.Server.question.entity.QuestionVote;
import com.seb_pre_007.Server.question.repository.QuestionRepository;
import com.seb_pre_007.Server.question.repository.QuestionVoteRepository;
import com.seb_pre_007.Server.tag.entity.Tag;
import com.seb_pre_007.Server.tag.service.TagService;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.Positive;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class QuestionService {

    private final QuestionRepository questionRepository;
    private final TagService tagService;
    private final  QuestionTagService questionTagService;
    private final UserService userService;
    private final QuestionVoteRepository questionVoteRepository;
    private final AnswerVoteRepository answerVoteRepository;


    /**
     * 질문 생성
     */
    @Transactional
    public Question createQuestion(QuestionPostDto questionPostDto, String userEmail) {

        User findUser = userService.getUser(userEmail); // 로그인된 유저의 이메일 정보를 통해 유저 정보 가져오기

        // 클라이언트로부터 전달된 Question 정보로 Question 객체 생성
        Question question = new Question();
        question.setUser(findUser);
        question.setQuestionTitle(questionPostDto.getQuestionTitle());
        question.setQuestionContent(questionPostDto.getQuestionContent());

        // Tag 는 입력되지 않았을 수 있다. Tag 가 null 이 아닐 경우에만 태그-질문 연관관계 세팅
        if (questionPostDto.getQuestionTag() != null) {
            setTagListToFindQuestion(questionPostDto, question);
        }

        return questionRepository.save(question);
    }

    /**
     * 질문 전체 조회
     */
    public Page<Question> findQuestions(int page, int limit) {
        return questionRepository.findAll(PageRequest.of(page, limit, Sort.by("questionCreated").descending()));
    }

    /**
     * tag로 질문 검색
     */
    public Page<Question> findQuestionSearch(String questionTag, int page, int limit) {

        Tag findTag = tagService.findByTagName(questionTag); // 입력된 tagName 으로 DB 의 Tag 조회 (Tag 가 존재하지 않으면 null 반환)

        // 조회한 findTag 가 없으면, 빈 Page 만들어서 리턴.
        if(findTag==null){
            return new PageImpl<>(new ArrayList<>());
        }

        // 태그가 DB 에 존재할 경우, 해당 태그를 사용하고 있는 Question 을 QuestionTag 테이블에서 조회
        List<QuestionTag> questionTagList = questionTagService.questionTags(findTag);

        // List<QuestionTag> -> List<Question> 로 변환
        List<Question> questions = questionTagList.stream()
                .map(findQuestionTag -> findQuestionTag.getQuestion())
                .sorted(Comparator.comparing(Question::getQuestionCreated).reversed())
                .collect(Collectors.toList());

        // 변환한 List<Question> 을 Page 로 생성
        PageRequest pageRequest = PageRequest.of(page, limit/*, Sort.by("questionCreated").descending()*/); // Paging 조건 설정 (페이지 생성 시 정렬 조건 안 먹힘)
        int start = (int) pageRequest.getOffset(); // 페이지 시작 데이터 위치
        int end = Math.min(start + pageRequest.getPageSize(), questions.size()); // 페이지의 마지막 데이터 위치
        Page<Question> questionPage = new PageImpl<>(questions.subList(start, end), pageRequest, questions.size()); // Paging 된 리스트로 생성

        return questionPage;

    }

    /**
     * 질문 상세 조회
     */
    public Question findQuestion(long questionId, String userEmail) {

        Question findQuestion = findVerifiedQuestion(questionId); // 입력된 questionId로 질문 조회

        updateViewQuestions(findQuestion); // 질문 조회수 +1 업데이트

        if (userEmail != null) { // 로그인 O
            User findUser = userService.getUser(userEmail);

            setQuestionVoteStatus(findUser, findQuestion); // 해당 유저의 Question에 대한 voteStatus를 findQuestion 에 세팅 ("LIKE"/"DISLIKE"/"NONE")

            for (Answer answer : findQuestion.getAnswerList()) {
                setAnswerVoteStatus(findUser, answer);
            }
        } else { // 로그인 X
            findQuestion.setQuestionVoteStatus(QuestionVote.VoteType.NONE.toString());
            for (Answer answer : findQuestion.getAnswerList()) {
                answer.setAnswerVoteStatus(AnswerVote.VoteType.NONE.toString());
            }
        }

        return findQuestion;
    }


    /**
     * 질문 수정
     */
    @Transactional
    public Question updateQuestion(QuestionPatchDto questionPatchDto, String userEmail) {

        Question findQuestion = findVerifiedQuestion(questionPatchDto.getQuestionId()); // 입력된 questionId로 질문 조회
        verifyUser(userEmail, findQuestion); // 작성자 여부 확인

        // 입력된 태그 값이 null 이 아닐 때만 수정
        if (questionPatchDto.getQuestionTag() != null) {

            // 기존 태그-질문 정보 삭제
            questionTagService.deleteQuestionTags(findQuestion);
            findQuestion.setQuestionTagList(new ArrayList<>());

            // 태그 연관관계 세팅
            setTagListToFindQuestion(questionPatchDto, findQuestion);
        }

        Optional.ofNullable(questionPatchDto.getQuestionTitle()).ifPresent(findQuestion::setQuestionTitle);
        Optional.ofNullable(questionPatchDto.getQuestionContent()).ifPresent(findQuestion::setQuestionContent);

        return questionRepository.save(findQuestion);
    }

    /**
     * 질문 삭제
     */
    @Transactional
    public void deleteQuestion(long questionId, String userEmail){
        Question findQuestion = findVerifiedQuestion(questionId); // 유효한 Question 인지 검증
        verifyUser(userEmail, findQuestion); // 작성자 여부 검증

        questionRepository.delete(findQuestion); // Question 삭제
    }


    // 질문 조회수 +1 업데이트
    @Transactional
    public void updateViewQuestions(Question findQuestion) {

        int questionCount= findQuestion.getQuestionCount();
        findQuestion.setQuestionCount(questionCount+1);
        System.out.println("조회수 테스트중:"+questionCount);
        questionRepository.save(findQuestion);
    }

    // 질문-태그 연관관계 세팅
    private void setTagListToFindQuestion(Object questionDto, Question findQuestion) {

        List<String> inputTags = getInputTags(questionDto);

        for (int i = 0; i < inputTags.size(); i++) {
            Tag findTag = tagService.findByTagName(inputTags.get(i));
            if (findTag == null) findTag = tagService.createTag(inputTags.get(i));
            findQuestion.addQuestionTag(new QuestionTag(findTag));
        }
    }

    // 클라이언트로부터 입력받은 질문 정보에서 태그 리스트 정보를 가져오고, 각 태그 이름 대문자 변환 처리
    private static List<String> getInputTags(Object questionDto) {
        List<String> inputTags = new ArrayList<>();

        if (questionDto instanceof QuestionPatchDto) {
            inputTags = ((QuestionPatchDto) questionDto).getQuestionTag().stream()
                    .map(String::toUpperCase)
                    .collect(Collectors.toList());
        }
        if (questionDto instanceof QuestionPostDto) {
            inputTags = ((QuestionPostDto) questionDto).getQuestionTag().stream()
                    .map(String::toUpperCase)
                    .collect(Collectors.toList());
        }
        return inputTags;
    }

    // DB 에서 조회한 findQuestion 의 유저 정보와 로그인된 유저 정보가 일치하는지 확인 (불일치할 경우 예외 발생)
    private void verifyUser(String userEmail, Question findQuestion) {
        if (!findQuestion.getUser().getUserEmail().equals(userEmail)) {
            throw new BusinessLogicException(ExceptionCode.USER_DOES_NOT_MATCH);
        }
    }

    // 입력된 questionId에 해당하는 Question 이 존재하는지 검증 (존재하지 않을 경우 예외 발생)
    public Question findVerifiedQuestion(Long questionId) {
        Optional<Question> question = questionRepository.findById(questionId);

        return question.orElseThrow(() -> new BusinessLogicException(ExceptionCode.QUESTION_NOT_FOUND));
    }

    @Transactional
    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }

    // Question 에 해당 유저의 QuestionVoteStatus 세팅
    private void setQuestionVoteStatus(User findUser, Question findQuestion) {

        Optional<QuestionVote> findQuestionVote = questionVoteRepository.findQuestionVoteByQuestionAndUser(findQuestion, findUser);

        if (findQuestionVote.isPresent()) { // findQuestionVote 가 있을 때
            findQuestion.setQuestionVoteStatus(findQuestionVote.get().getVoteType().toString());
        } else { // findVote 가 없을 때
            findQuestion.setQuestionVoteStatus(QuestionVote.VoteType.NONE.toString());
        }
    }

    // Answer 에 해당 유저의 AnswerVoteStatus 세팅
    private void setAnswerVoteStatus(User findUser, Answer answer) {
        Optional<AnswerVote> findAnswerVote = answerVoteRepository.findAnswerVoteByAnswerAndUser(answer, findUser);

        if (findAnswerVote.isPresent()) { // findVote 가 있을 때
            answer.setAnswerVoteStatus(findAnswerVote.get().getVoteType().toString());
        } else { // findVote 가 없을 때
            answer.setAnswerVoteStatus(AnswerVote.VoteType.NONE.toString());
        }
    }

}
