package com.seb_pre_007.auth;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LoginDto {
    private String userEmail;
    private String userPassword;
}