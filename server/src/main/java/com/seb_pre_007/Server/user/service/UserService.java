package com.seb_pre_007.Server.user.service;


import com.seb_pre_007.Server.auth.utils.CustomAuthorityUtils;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.repository.UserRepository;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

        verifyExistEmail(user.getUserEmail());

        // (3) 추가: Password 암호화
        user.setUserPassword(user.getUserPassword());

        // (4) 추가: DB에 User Role 저장
        List<String> roles = customAuthorityUtils.createRoles(user.getUserEmail());
        user.setRoles(roles);

        User savedUser= userRepository.save(user);


        return savedUser;
    }
    //이미 등록된 이메일인지 확인하는 검증 로직
    private void verifyExistEmail(String userEmail) {

        Optional<User> user= userRepository.findByUserEmail(userEmail);

        if(user.isPresent())
            throw new RuntimeException("이메일이 존재합니다!");
    }
}
