package com.seb_pre_007.Server.user.dto;

import com.seb_pre_007.Server.vaildator.NotSpace;
import lombok.Data;

@Data
public class UserPatchDto {

    @NotSpace
    private String userNickname;

    private String userEmail;
}
