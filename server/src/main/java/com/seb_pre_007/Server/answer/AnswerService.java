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

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
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

}
