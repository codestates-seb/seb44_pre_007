package com.seb_pre_007.Server.answer.service;


import com.seb_pre_007.Server.answer.dto.AnswerPatchDto;
import com.seb_pre_007.Server.answer.dto.AnswerPostDto;
import com.seb_pre_007.Server.answer.entity.Answer;
import com.seb_pre_007.Server.answer.repository.AnswerRepository;
import com.seb_pre_007.Server.exception.BusinessLogicException;
import com.seb_pre_007.Server.exception.ExceptionCode;
import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.service.UserService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final UserService userService;

    //repo, userService DI 주입
    public AnswerService(AnswerRepository answerRepository, UserService userService) {
        this.answerRepository = answerRepository;
        this.userService = userService;
    }

    //답변 생성
    public Answer createAnswer(Question targetQuestion, AnswerPostDto answerPostDto, String userEmail){
        //answer는 바디, userid만 가지고 있음

        User findUser = userService.getUser(userEmail);

        Answer answer = new Answer();
        answer.setAnswerContent(answerPostDto.getAnswerContent());
        answer.setUser(findUser);
        answer.setQuestion(targetQuestion);

        return answerRepository.save(answer);
    }

    //답변 수정
    public Answer updateAnswer(AnswerPatchDto answerPatchDto, String userEmail){
        Answer findAnswer = findVerifiedAnswer(answerPatchDto.getAnswerId());
        verifyUser(userEmail, findAnswer);


        Optional.ofNullable(answerPatchDto.getAnswerContent()).ifPresent(findAnswer::setAnswerContent);

        return answerRepository.save(findAnswer);
    }

    //답변의 작성자와 현재 로그인한 작성자가 동일한지 체크
    private void verifyUser(String userEmail, Answer findAnswer) {
        if (!findAnswer.getUser().getUserEmail().equals(userEmail)) {
            throw new BusinessLogicException(ExceptionCode.USER_DOES_NOT_MATCH);
        }
    }

    //답변 id로 답변찾기
    public Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> answer = answerRepository.findById(answerId);
        return answer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }

    //답변 삭제
    @Transactional
    public void deleteAnswer(Question targetQuestion, long answerId, String userEmail){
        Answer findanswer = findVerifiedAnswer(answerId);
        verifyUser(userEmail, findanswer);

        findanswer.setQuestion(targetQuestion);

        //여기서 question에 answercount를 1 줄여준걸 저장하고
        answerRepository.save(findanswer);

        //삭제
        answerRepository.delete(findanswer);

    }

    @Transactional
    public Answer saveAnswer(Answer answer) {
        return answerRepository.save(answer);
    }
}
