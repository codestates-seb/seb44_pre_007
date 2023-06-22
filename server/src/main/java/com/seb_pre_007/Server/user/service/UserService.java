package com.seb_pre_007.Server.user.service;


import com.seb_pre_007.Server.auth.utils.CustomAuthorityUtils;
import com.seb_pre_007.Server.exception.BusinessLogicException;
import com.seb_pre_007.Server.exception.ExceptionCode;
import com.seb_pre_007.Server.user.dto.UserPatchDto;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.repository.UserRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.Null;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final CustomAuthorityUtils customAuthorityUtils;

    public UserService(UserRepository userRepository,  PasswordEncoder passwordEncoder, CustomAuthorityUtils customAuthorityUtils) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.customAuthorityUtils = customAuthorityUtils;
    }

    // 일반 회원 가입
    public User createUser(User user){
        // 가입된 이메일 정보인지 검증 -> DB에 이메일이 존재하면 예외 발생
        if(verifyExistEmail(user.getUserEmail())){
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
        user.setUserPassword(user.getUserPassword()); // 필요한지?

        // DB에 User Role 저장
        List<String> roles = customAuthorityUtils.createRoles(user.getUserEmail());
        user.setRoles(roles);

        User savedUser= userRepository.save(user);

        return savedUser;
    }

    // 구글 로그인 회원 가입
    public User createGoogleUser(User user){
        if(!verifyExistEmail(user.getUserEmail())){
            user.setUserPassword(user.getUserPassword());

            // (4) 추가: DB에 User Role 저장
            List<String> roles = customAuthorityUtils.createRoles(user.getUserEmail());
            user.setRoles(roles);

            user= userRepository.save(user);
        }
        return user;
    }

    // 회원 정보 조회
    public User getUser(String userEmail){
        Optional<User> optional = userRepository.findByUserEmail(userEmail);
        return optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERS_NOT_VALID));
    }

    // 회원 정보 수정
    @Transactional
    public User updateUser(UserPatchDto userPatchDto) {
        User findUser = getUser(userPatchDto.getUserEmail());
        Optional.ofNullable(userPatchDto.getUserNickname()).ifPresent(findUser::setUserNickname);
        return userRepository.save(findUser);
    }

    // 회원 정보 삭제
    @Transactional
    public void deleteUser(String userEmail) {
        User findUser = getUser(userEmail);
        userRepository.delete(findUser);
    }


    // 이미 등록된 이메일 여부 확인 -> boolean 타입 반환
    private boolean verifyExistEmail(String userEmail) {

        Optional<User> user= userRepository.findByUserEmail(userEmail);
        return user.isPresent();
    }
}
