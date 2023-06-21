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

    public User createUser(User user){
        if(verifyExistEmail(user.getUserEmail())){
            throw new BusinessLogicException(ExceptionCode.USER_EXISTS);
        }
        user.setUserPassword(user.getUserPassword());

        // (4) 추가: DB에 User Role 저장
        List<String> roles = customAuthorityUtils.createRoles(user.getUserEmail());
        user.setRoles(roles);

        User savedUser= userRepository.save(user);


        return savedUser;
    }

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

    //이미 등록된 이메일인지 확인하는 검증 로직
    private boolean verifyExistEmail(String userEmail) {

        Optional<User> user= userRepository.findByUserEmail(userEmail);

        return user.isPresent();
    }


    //유저 정보조회
    public User getUser(String userEmail){
        Optional<User> optional = userRepository.findByUserEmail(userEmail);
        return optional.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USERS_NOT_VALID));
    }


    // 회원 정보 수정
    @Transactional
    public User updateUser(UserPatchDto userPatchDto) {
        User findUser = findVerifiedUser(userPatchDto.getUserEmail());

        Optional.ofNullable(userPatchDto.getUserNickname()).ifPresent(findUser::setUserNickname);

        return userRepository.save(findUser);
    }

    // 회원 정보 삭제
    @Transactional
    public void deleteUser(String userEmail, long userId) {
        User findUser = findVerifiedUser(userEmail);
        userRepository.delete(findUser);
    }


    private User findVerifiedUser(String userEmail) {
        User findUser = userRepository.findByUserEmail(userEmail)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NO_HAVE_AUTHORIZATION));
        return findUser;
    }
}
