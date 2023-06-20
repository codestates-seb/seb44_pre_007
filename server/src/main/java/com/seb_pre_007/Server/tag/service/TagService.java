package com.seb_pre_007.Server.tag.service;


import com.seb_pre_007.Server.tag.entity.Tag;
import com.seb_pre_007.Server.tag.repostiory.TagRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class TagService {

    private  final TagRepository tagRepository;

    public TagService(TagRepository tagRepository) {
        this.tagRepository = tagRepository;
    }

     public Tag findByTagName(String tagName){

        Optional<Tag> findTagName= tagRepository.findByTagName(tagName);

        return  findTagName.orElse(null);
     }

    public Tag createTag(String tagName) {
        return tagRepository.save(new Tag(tagName));
    }
}
