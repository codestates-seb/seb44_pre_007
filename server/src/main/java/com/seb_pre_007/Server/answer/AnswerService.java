package com.seb_pre_007.Server.answer;


import com.seb_pre_007.Server.exception.BusinessLogicException;
import com.seb_pre_007.Server.exception.ExceptionCode;
import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.repository.QuestionRepository;
import com.seb_pre_007.Server.question.service.QuestionTagService;
import com.seb_pre_007.Server.tag.service.TagService;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
import java.util.Optional;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final UserService userService;

    public AnswerService(AnswerRepository answerRepository, UserService userService) {
        this.answerRepository = answerRepository;
        this.userService = userService;
    }

    public Answer createAnswer(Question targetQuestion, AnswerPostDto answerPostDto, String userEmail){
        //answer는 바디, userid만 가지고 있음

        User findUser = userService.getUser(userEmail);

        Answer answer = new Answer();
        answer.setAnswerContent(answerPostDto.getAnswerContent());
        answer.setUser(findUser);
        answer.setQuestion(targetQuestion);

        return answerRepository.save(answer);
    }

    public Answer updateAnswer(Question targetQuestion, AnswerPatchDto answerPatchDto, String userEmail){
        Answer findAnswer = findVerifiedAnswer(answerPatchDto.getAnswerId());
        verifyUser(userEmail, findAnswer);

        Optional.ofNullable(answerPatchDto.getAnswerContent()).ifPresent(findAnswer::setAnswerContent);

        return answerRepository.save(findAnswer);
    }

    private void verifyUser(String userEmail, Answer findAnswer) {
        if (!findAnswer.getUser().getUserEmail().equals(userEmail)) {
            throw new BusinessLogicException(ExceptionCode.USER_DOES_NOT_MATCH);
        }
    }

    private Answer findVerifiedAnswer(Long answerId) {
        Optional<Answer> answer = answerRepository.findById(answerId);
        return answer.orElseThrow(() -> new BusinessLogicException(ExceptionCode.ANSWER_NOT_FOUND));
    }

    @Transactional
    public void deleteAnswer(long answerId, String userEmail){
        Answer findanswer = findVerifiedAnswer(answerId);
        verifyUser(userEmail, findanswer);

        answerRepository.delete(findanswer);

    }
}
