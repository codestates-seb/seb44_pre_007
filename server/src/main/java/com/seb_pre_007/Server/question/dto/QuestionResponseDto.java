package com.seb_pre_007.Server.question.dto;

import com.seb_pre_007.Server.response.PageInfo;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.security.core.parameters.P;

import java.util.List;

@Data
public class QuestionResponseDto {

    private List<QuestionData> data;
    private PageInfo pageInfo;

    public QuestionResponseDto(List<QuestionData> data, Page page) {
        this.data = data;
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
