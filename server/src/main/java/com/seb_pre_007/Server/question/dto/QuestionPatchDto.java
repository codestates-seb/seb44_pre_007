package com.seb_pre_007.Server.question.dto;


import com.seb_pre_007.Server.question.entity.QuestionTag;
import lombok.Data;

import java.util.List;

@Data
public class QuestionPatchDto {

    private Long questionId;
    private String questionTitle;
    private String questionContent;
    private List<String> questionTag;

}
