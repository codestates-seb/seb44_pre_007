package com.seb_pre_007.Server.question.service;

import com.seb_pre_007.Server.exception.BusinessLogicException;
import com.seb_pre_007.Server.exception.ExceptionCode;
import com.seb_pre_007.Server.question.dto.QuestionVoteResponseDto;
import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.entity.QuestionVote;
import com.seb_pre_007.Server.question.repository.QuestionVoteRepository;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

import static com.seb_pre_007.Server.question.entity.QuestionVote.VoteType.*;

@Service
@RequiredArgsConstructor
@Transactional
public class QuestionVoteService {

    private final QuestionVoteRepository questionVoteRepository;
    private final QuestionService questionService;
    private final UserService userService;

    public QuestionVoteResponseDto voteLike(String userEmail, Long questionId) {
        // Question, User 정보 가져오기 (+ 존재 여부 검증)
        Question findQuestion = questionService.findVerifiedQuestion(questionId);
        User findUser = userService.getUser(userEmail);

        int voteCount = findQuestion.getQuestionVoteCount();

        // 본인 글에는 좋아요 / 싫어요 무효화
        String findEmail = findQuestion.getUser().getUserEmail();
        if (userEmail.equals(findEmail)) {
            return new QuestionVoteResponseDto(questionId, voteCount);
        }

        // user가 해당 question에 투표한 정보 가져오기 (LIKE / DISLIKE / null)
        Optional<QuestionVote> findVote = questionVoteRepository.findQuestionVoteByQuestionAndUser(findQuestion, findUser);

        if (findVote.isPresent()) { // 이미 좋아요 or 싫어요를 누른 상태
            if (findVote.get().getVoteType().equals(LIKE)) voteCount--;
            if (findVote.get().getVoteType().equals(DISLIKE)) voteCount++;
            questionVoteRepository.delete(findVote.get());
        }

        if (findVote.isEmpty()) { // 아무런 투표도 하지 않은 상태
            questionVoteRepository.save(new QuestionVote(findQuestion, findUser, LIKE));
            voteCount++;
        }

        findQuestion.setQuestionVoteCount(voteCount); // Question 에 voteCount 갱신
        questionService.saveQuestion(findQuestion); // 갱신한 Question 저장

        return new QuestionVoteResponseDto(questionId, voteCount);
    }

    public QuestionVoteResponseDto voteDisLike(String userEmail, Long questionId) {
        // Question, User 정보 가져오기 (+ 존재 여부 검증)
        Question findQuestion = questionService.findVerifiedQuestion(questionId);
        User findUser = userService.getUser(userEmail);

        int voteCount = findQuestion.getQuestionVoteCount();

        // 본인 글에는 좋아요 / 싫어요 무효화
        String findEmail = findQuestion.getUser().getUserEmail();
        if (userEmail.equals(findEmail)) {
            return new QuestionVoteResponseDto(questionId, voteCount);
        }

        // user가 해당 question에 투표한 정보 가져오기 (LIKE / DISLIKE / null)
        Optional<QuestionVote> findVote = questionVoteRepository.findQuestionVoteByQuestionAndUser(findQuestion, findUser);

        if (findVote.isPresent()) { // 이미 좋아요 or 싫어요를 누른 상태
            if (findVote.get().getVoteType().equals(LIKE)) voteCount--;
            if (findVote.get().getVoteType().equals(DISLIKE)) voteCount++;
            questionVoteRepository.delete(findVote.get());
        }

        if (findVote.isEmpty()) { // 아무런 투표도 하지 않은 상태 (이부분만 다르고 사실 로직 동일..)
            questionVoteRepository.save(new QuestionVote(findQuestion, findUser, DISLIKE));
            voteCount--;
        }

        findQuestion.setQuestionVoteCount(voteCount); // Question 에 voteCount 갱신
        questionService.saveQuestion(findQuestion); // 갱신한 Question 저장

        return new QuestionVoteResponseDto(questionId, voteCount);
    }

}
