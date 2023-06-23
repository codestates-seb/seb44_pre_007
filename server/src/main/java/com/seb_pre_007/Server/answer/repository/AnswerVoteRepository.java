package com.seb_pre_007.Server.answer.repository;

import com.seb_pre_007.Server.answer.entity.Answer;
import com.seb_pre_007.Server.answer.entity.AnswerVote;
import com.seb_pre_007.Server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AnswerVoteRepository extends JpaRepository<AnswerVote, Long> {

    Optional<AnswerVote> findAnswerVoteByAnswerAndUser(Answer answer, User user);
}
