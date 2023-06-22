package com.seb_pre_007.Server.question.repository;

import com.seb_pre_007.Server.question.entity.QuestionVote;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {

}
