package com.seb_pre_007.Server.question.repository;

import com.seb_pre_007.Server.question.entity.Question;
import com.seb_pre_007.Server.question.entity.QuestionVote;
import com.seb_pre_007.Server.user.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface QuestionVoteRepository extends JpaRepository<QuestionVote, Long> {

    Optional<QuestionVote> findQuestionVoteByQuestionAndUser(Question question, User user);

}
