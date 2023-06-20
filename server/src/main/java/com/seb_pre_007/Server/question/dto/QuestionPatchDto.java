package com.seb_pre_007.Server.question.dto;


import com.seb_pre_007.Server.question.entity.QuestionTag;
import com.seb_pre_007.Server.vaildator.NotSpace;
import lombok.Data;

import java.util.List;

@Data
public class QuestionPatchDto {

    private Long questionId;
    @NotSpace
    private String questionTitle;
    @NotSpace
    private String questionContent;
    private List<String> questionTag;

}
