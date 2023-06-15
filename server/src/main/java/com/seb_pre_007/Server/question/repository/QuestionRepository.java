package com.seb_pre_007.Server.question.repository;

import com.seb_pre_007.Server.question.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
