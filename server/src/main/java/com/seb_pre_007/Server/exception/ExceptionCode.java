package com.seb_pre_007.Server.exception;

import lombok.Getter;

public enum ExceptionCode {
    USER_NOT_FOUND(404,"User not found"),
    USER_EXISTS(409,"User exists"),
    USER_NO_HAVE_AUTHORIZATION(401,"User no have authorization"),
    USERS_NOT_VALID(409, "등록되지 않은 사용자입니다."),
    INVALID_USER_STATUS(400,"Invalid User status"),
    USER_DOES_NOT_MATCH(403,"User does not match"),
    QUESTION_NOT_FOUND(404,"Question not found"),
    QUESTION_CANNOT_CHANGE(403,"Question can not change"),
    QUESTION_CANNOT_DELETE(403,"Question can not delete"),
    QUESTION_HAS_BEEN_DELETED(403,"Question has been deleted"),
    ANSWER_NOT_FOUND(404,"Answer not found"),
    ANSWER_EXISTS(409, "Answer exists"),
    ANSWER_CANNOT_CHANGE(403,"Answer can not change"),
    ANSWER_CANNOT_DELETE(403,"Answer can not delete"),
    COMMENT_NOT_FOUND(404,"Comment not found"),
    COMMENT_CANNOT_CHANGE(403, "Comment can not change"),
    COMMENT_CANNOT_DELETED(403, "Comment can not deleted"),
    COMMENT_CANNOT_REGISTER(403,"Comment can not register"),
    NOT_IMPLEMENTATION(501,"Not Implementation");

    @Getter
    private int status;

    @Getter
    private String message;

    ExceptionCode(int code, String message) {
        this.status = code;
        this.message = message;
    }

}
