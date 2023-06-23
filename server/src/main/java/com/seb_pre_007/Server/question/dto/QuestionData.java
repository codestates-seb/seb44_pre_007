package com.seb_pre_007.Server.question.dto;

import com.seb_pre_007.Server.tag.dto.TagDto;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 질문리스트 응답 시 사용되는 Dto : Question -> QuestionData
 */
@Data
@Builder
public class QuestionData {

    private String questionUserNickname;
    private long questionId;
    private String questionTitle;
    private String questionContent;
    private LocalDateTime questionCreated;
    private LocalDateTime questionUpdated;
    private int questionCount;
    private int questionVoteCount;

    private int answerCount;
    private List<TagDto> tagList;

}
