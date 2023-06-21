package com.seb_pre_007.Server.user.dto;

import com.seb_pre_007.Server.vaildator.NotSpace;
import lombok.Getter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

@Getter
public class UserPostDto {

    @NotBlank
    @Email
    private String userEmail;

    private String imgURL;

    @NotSpace
    private String userPassword;

    @NotBlank(message = "닉네임은 공백이 아니여야 합니다.")
    private String userNickname;
}
