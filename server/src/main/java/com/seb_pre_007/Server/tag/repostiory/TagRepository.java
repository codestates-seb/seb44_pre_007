package com.seb_pre_007.Server.tag.repostiory;

import com.seb_pre_007.Server.tag.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TagRepository  extends JpaRepository<Tag, Long> {
    Optional<Tag> findByTagName(String tagName);
}
