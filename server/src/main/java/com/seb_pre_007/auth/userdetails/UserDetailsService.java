package com.seb_pre_007.auth.userdetails;

import com.seb_pre_007.auth.*;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.repository.UserRepository;
import com.seb_pre_007.auth.CustomAuthorityUtils;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.Optional;


@Component
@Service
public class UserDetailsService implements org.springframework.security.core.userdetails.UserDetailsService {
    private final UserRepository userRepository;
    private final CustomAuthorityUtils authorityUtils;
    private final PasswordEncoder passwordEncoder;

    public UserDetailsService(UserRepository userRepository, CustomAuthorityUtils authorityUtils, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.authorityUtils = authorityUtils;
        this.passwordEncoder = passwordEncoder;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByUserEmail(username);
        User findUser = optionalUser.orElseThrow(() -> new BusinessLogicException(ExceptionCode.USER_NOT_FOUND));

        return new UserDetails(findUser);
    }

    private final class UserDetails extends User implements org.springframework.security.core.userdetails.UserDetails {
        // (1)
        UserDetails(User user) {
            setUserId(user.getUserId());
            setUserEmail(user.getUserEmail());
            setUserPassword(passwordEncoder.encode(user.getUserPassword()));
            setUserNickname(user.getUserNickname());

        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
            return null;
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