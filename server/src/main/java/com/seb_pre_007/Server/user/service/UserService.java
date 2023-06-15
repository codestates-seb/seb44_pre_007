package com.seb_pre_007.Server.user.service;


import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {


    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user){

        verifyExistEmail(user.getUserEmail());

        return userRepository.save(user);
    }
    //이미 등록된 이메일인지 확인하는 검증 로직
    private void verifyExistEmail(String userEmail) {

        Optional<User> user= userRepository.findByUserEmail(userEmail);

        if(user.isPresent())
            throw new RuntimeException("이메일이 존재합니다!");
    }
}
