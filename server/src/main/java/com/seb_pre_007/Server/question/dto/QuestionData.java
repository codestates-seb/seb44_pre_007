package com.seb_pre_007.Server.question.dto;

import com.seb_pre_007.Server.tag.dto.TagDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class QuestionData {

    private String questionUserNickname;
    private long questionId;
    private String questionTitle;
    private String questionContent;
    private LocalDateTime questionCreated;
    private LocalDateTime questionUpdated;
    private int answerCount;
    private int questionCount;
    private List<TagDto> tagList;

}
