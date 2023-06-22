package com.seb_pre_007.Server.question.service;


import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.entity.QuestionTag;
import com.seb_pre_007.Server.question.repository.QuestionTagRepository;
import com.seb_pre_007.Server.tag.entity.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionTagService {

    private final QuestionTagRepository questionTagRepository;

    public QuestionTagService(QuestionTagRepository questionTagRepository) {
        this.questionTagRepository = questionTagRepository;
    }

    // 해당 태그를 사용하고 있는 Question 을 QuestionTag 테이블에서 조회
    public List<QuestionTag> questionTags(Tag tag){
        return  questionTagRepository.findByTag(tag);
    }

    // QuestionTag 테이블에서 해당 Question 과 매핑된 태그 정보 모두 삭제 (= Question 에서 태그 모두 삭제)
    public void deleteQuestionTags(Question question) {
        questionTagRepository.deleteAllByQuestion(question);
    }

}
