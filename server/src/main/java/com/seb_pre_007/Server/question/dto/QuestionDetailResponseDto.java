package com.seb_pre_007.Server.question.dto;

/*
* {
   “questionUserNickname”: String(질문작성자닉네임),
   “questionTitle”: String(질문제목),
   “questionContent”: String(질문내용),
   “questionTag”: [ (질문에 달린 태그 리스트)
        {
            "tagId": 8,
            "tagName": "태그8"
        }
    ]
   “questionCount”: Number(질문 조회수),
   “answerCount”: Number(답변수),
   “questionCreated”: String(질문생성일자),
   “questionUpdated”: String(질문수정일자),
   “answers”: [
         {
            “answerId”: Number(답변ID),
            “answerUserNickname”: String(답변작성자닉네임),
            “answerContent”: String(답변내용),
            “answerCreated”: String(답변등록일자),
            “answerUpdated”: String(답변수정일자)
         }
    ]
}
* */

import com.seb_pre_007.Server.answer.dto.AnswerResponseDto;
import com.seb_pre_007.Server.answer.entity.Answer;
import com.seb_pre_007.Server.question.entity.QuestionTag;
import com.seb_pre_007.Server.tag.dto.TagDto;
import com.seb_pre_007.Server.tag.entity.Tag;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 질문 상세 조회 시 사용되는 응답 데이터 : Question -> QuestionDetailResponseDto
 */
@Data
@Builder
public class QuestionDetailResponseDto {

    private String userEmail;
    private String questionUserNickname;
    private String questionTitle;
    private String questionContent;

    private List<TagDto> tagList;

    private int questionCount;


    @CreatedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
    private LocalDateTime questionCreated;

    @LastModifiedDate
    @DateTimeFormat(pattern = "yyyy-MM-dd/HH:mm:ss")
    private LocalDateTime questionUpdated;

    private List<AnswerResponseDto> answerList;



}
