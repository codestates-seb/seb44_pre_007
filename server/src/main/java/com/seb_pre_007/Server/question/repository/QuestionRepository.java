package com.seb_pre_007.Server.question.repository;

import com.seb_pre_007.Server.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Question findByQuestionId(long questionId);
}
