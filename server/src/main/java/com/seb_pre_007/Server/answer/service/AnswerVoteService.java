package com.seb_pre_007.Server.answer.service;

import com.seb_pre_007.Server.answer.dto.AnswerVoteResponseDto;
import com.seb_pre_007.Server.answer.entity.Answer;
import com.seb_pre_007.Server.answer.entity.AnswerVote;
import com.seb_pre_007.Server.answer.repository.AnswerVoteRepository;
import com.seb_pre_007.Server.question.dto.QuestionVoteResponseDto;
import com.seb_pre_007.Server.question.repository.QuestionVoteRepository;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AnswerVoteService {

    private final AnswerVoteRepository answerVoteRepository;
    private final AnswerService answerService;
    private final UserService userService;


    public AnswerVoteResponseDto voteLike(String userEmail, Long answerId) {

        Answer findAnswer = answerService.findVerifiedAnswer(answerId);
        User findUser = userService.getUser(userEmail);

        int voteCount = findAnswer.getAnswerVoteCount();

        String findEmail = findAnswer.getUser().getUserEmail();
        if (userEmail.equals(findEmail)) {
            return new AnswerVoteResponseDto(answerId, voteCount);
        }

        Optional<AnswerVote> findVote = answerVoteRepository.findAnswerVoteByAnswerAndUser(findAnswer, findUser);

        if (findVote.isPresent()) {
            if(findVote.get().getVoteType().equals(AnswerVote.VoteType.LIKE)) voteCount--;
            if(findVote.get().getVoteType().equals(AnswerVote.VoteType.DISLIKE)) voteCount--;
            answerVoteRepository.delete(findVote.get());
        }

        if (findVote.isEmpty()) {
            answerVoteRepository.save(new AnswerVote(findAnswer, findUser, AnswerVote.VoteType.LIKE));
            voteCount++;
        }
        findAnswer.setAnswerVoteCount(voteCount);
        answerService.saveAnswer(findAnswer);

        return new AnswerVoteResponseDto(answerId, voteCount);

    }

    public AnswerVoteResponseDto voteDisLike(String userEmail, Long answerId) {
        Answer findAnswer = answerService.findVerifiedAnswer(answerId);
        User findUser = userService.getUser(userEmail);

        int voteCount = findAnswer.getAnswerVoteCount();

        String findEmail = findAnswer.getUser().getUserEmail();
        if (userEmail.equals(findEmail)) {
            return new AnswerVoteResponseDto(answerId, voteCount);
        }

        Optional<AnswerVote> findVote = answerVoteRepository.findAnswerVoteByAnswerAndUser(findAnswer, findUser);

        if (findVote.isPresent()) {
            if(findVote.get().getVoteType().equals(AnswerVote.VoteType.LIKE)) voteCount--;
            if(findVote.get().getVoteType().equals(AnswerVote.VoteType.DISLIKE)) voteCount--;
            answerVoteRepository.delete(findVote.get());
        }

        if (findVote.isEmpty()) {
            answerVoteRepository.save(new AnswerVote(findAnswer, findUser, AnswerVote.VoteType.DISLIKE));
            voteCount++;
        }
        findAnswer.setAnswerVoteCount(voteCount);
        answerService.saveAnswer(findAnswer);

        return new AnswerVoteResponseDto(answerId, voteCount);

    }






}
