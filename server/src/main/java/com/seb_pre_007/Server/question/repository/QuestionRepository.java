package com.seb_pre_007.Server.question.repository;

import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.entity.QuestionTag;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.validation.constraints.Positive;
import java.util.List;

public interface QuestionRepository extends JpaRepository<Question, Long> {


    Question findByQuestionId(long questionId);
}
