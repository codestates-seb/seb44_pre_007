package com.seb_pre_007.Server.auth.service;

import com.seb_pre_007.Server.auth.utils.CustomAuthorityUtils;
import com.seb_pre_007.Server.exception.BusinessLogicException;
import com.seb_pre_007.Server.exception.ExceptionCode;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

//데이터베이스에서 사용자의 크리덴셜을 조회한 후, 조회한 크리덴셜을 AuthenticationManager 에게 전달해주는 서비스
@Component
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    public CustomUserDetailsService(UserRepository userRepository, CustomAuthorityUtils authorityUtils, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityUtils = authorityUtils;
        this.passwordEncoder = passwordEncoder;
    }

    // 유저를 조회해서 맞는 유저인지 검증하는 메서드
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByUserEmail(username);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NO_HAVE_AUTHORIZATION));

        return new CustomUserDetails(findUser);
    }


    //UserDetails 에 유저의 정보들을 입력해주는 메서드
    public final class CustomUserDetails extends User implements org.springframework.security.core.userdetails.UserDetails {

        CustomUserDetails(User user){
            setUserId(user.getUserId());
            setUserEmail(user.getUserEmail());
            setUserPassword(passwordEncoder.encode(user.getUserPassword()));
            setRoles(user.getRoles());
            setUserNickname(user.getUserNickname());

        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() { //유저에게 권한 정보를 생성해주는 메서드
            return authorityUtils.createAuthorities(this.getRoles());
        }

        @Override
        public String getPassword() {

            return getUserPassword();
        }
        @Override
        public String getUsername() {
            return getUserEmail();
        }

        @Override
        public boolean isAccountNonExpired() {
            return true;
        }

        @Override
        public boolean isAccountNonLocked() {
            return true;
        }

        @Override
        public boolean isCredentialsNonExpired() {
            return true;
        }

        @Override
        public boolean isEnabled() {
            return true;
        }


    }
}
