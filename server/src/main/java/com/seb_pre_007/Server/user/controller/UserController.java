package com.seb_pre_007.Server.user.controller;


//import com.seb_pre_007.Server.auth.PrinclipalDetails;
import com.seb_pre_007.Server.auth.service.CustomUserDetailsService;
import com.seb_pre_007.Server.response.ApiResponse;
import com.seb_pre_007.Server.user.dto.UserPatchDto;
import com.seb_pre_007.Server.user.dto.UserPostDto;
import com.seb_pre_007.Server.user.dto.UserResponseDto;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.mapper.UserMapper;
import com.seb_pre_007.Server.user.service.UserService;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.parameters.P;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriBuilder;
import org.springframework.web.util.UriComponentsBuilder;
import org.springframework.web.util.UriUtils;

import javax.validation.Valid;
import java.net.URI;

@RestController
@Validated
public class UserController {

    private final UserService userService;
    private final UserMapper userMapper;

    public UserController(UserService userService, UserMapper userMapper) {
        this.userService = userService;
        this.userMapper = userMapper;
    }

    // 일반 회원 가입
    @PostMapping("/signup")
    public ResponseEntity postMember(@Valid @RequestBody UserPostDto userPostDto){

        User user= userService.createUser(userMapper.userPostDtoToUser(userPostDto));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // 유저 본인 프로필 조회
    @GetMapping("/principal")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity getPrincipal(Authentication authentication){
        String userEmail = authentication.getPrincipal().toString();
        User user = userService.getUser(userEmail);
        return ResponseEntity.ok().body(ApiResponse.ok("data", userMapper.userToUserResponse(user)));
    }

    // 유저 정보 수정
    @PatchMapping("/users/edit")
    public ResponseEntity patchUser(Authentication authentication,
                                    @Valid @RequestBody UserPatchDto userPatchDto) {

        String userEmail = authentication.getPrincipal().toString();
        userPatchDto.setUserEmail(userEmail);
        User updatedUser = userService.updateUser(userPatchDto);

        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 회원 탈퇴
    @DeleteMapping("/users/delete")
    public ResponseEntity deleteUser(Authentication authentication) {

        String userEmail = authentication.getPrincipal().toString();
        userService.deleteUser(userEmail);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
