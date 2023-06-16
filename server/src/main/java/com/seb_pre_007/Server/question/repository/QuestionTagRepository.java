package com.seb_pre_007.Server.question.repository;

import com.seb_pre_007.Server.question.entity.QuestionTag;
import com.seb_pre_007.Server.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface QuestionTagRepository extends JpaRepository<QuestionTag,Long> {

       List<QuestionTag> findByTag(Tag tag);
}
