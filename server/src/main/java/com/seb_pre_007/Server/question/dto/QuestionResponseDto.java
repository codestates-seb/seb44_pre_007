package com.seb_pre_007.Server.question.dto;

import com.seb_pre_007.Server.response.PageInfo;
import lombok.Data;
import org.springframework.data.domain.Page;
import org.springframework.security.core.parameters.P;

import javax.persistence.Column;
import java.util.List;

/**
 * 질문 리스트 응답 형식
 */
@Data
public class QuestionResponseDto {

    private List<QuestionData> data;
    private PageInfo pageInfo;

    public QuestionResponseDto(List<QuestionData> data, Page page) {
        this.data = data;

        // Page 객체를 통해 PageInfo 생성
        this.pageInfo = new PageInfo(page.getNumber() + 1,
                page.getSize(), page.getTotalElements(), page.getTotalPages());
    }
}
