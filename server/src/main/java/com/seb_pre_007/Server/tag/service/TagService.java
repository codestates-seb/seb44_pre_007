package com.seb_pre_007.Server.tag.service;


import com.seb_pre_007.Server.tag.entity.Tag;
import com.seb_pre_007.Server.tag.repostiory.TagRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TagService {

    private final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

    /**
     * 태그 이름으로 태그 조회 (결과가 없을 경우 null 리턴, 예외 X)
     */
    public Tag findByTagName(String tagName) {

        Optional<Tag> findTagName = tagRepository.findByTagName(tagName);

        return findTagName.orElse(null);
    }

    /**
     * 태그 생성
     */
    public Tag createTag(String tagName) {
        return tagRepository.save(new Tag(tagName));
    }
}
