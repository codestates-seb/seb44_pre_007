package com.seb_pre_007.Server.user.service;


import com.seb_pre_007.Server.auth.utils.CustomAuthorityUtils;
import com.seb_pre_007.Server.exception.BusinessLogicException;
import com.seb_pre_007.Server.exception.ExceptionCode;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.repository.UserRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
            throw new RuntimeException("이메일이 존재합니다!");
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
}
