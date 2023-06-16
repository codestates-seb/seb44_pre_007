package com.seb_pre_007.Server.auth.service;

import com.seb_pre_007.Server.auth.utils.CustomAuthorityUtils;
import com.seb_pre_007.Server.user.entity.User;
import com.seb_pre_007.Server.user.repository.UserRepository;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.Optional;

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


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<User> optionalUser = userRepository.findByUserEmail(username);
        User findUser = optionalUser.orElseThrow(() -> new RuntimeException("error!!!!!"));

        return new CustomUserDetails(findUser);
    }

    private final class CustomUserDetails extends User implements org.springframework.security.core.userdetails.UserDetails {
        // (1)
        CustomUserDetails(User user){
            setUserId(user.getUserId());
            setUserEmail(user.getUserEmail());
            setUserPassword(passwordEncoder.encode(user.getUserPassword()));
            setRoles(user.getRoles());
            setUserNickname(user.getUserNickname());

        }

        @Override
        public Collection<? extends GrantedAuthority> getAuthorities() {
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
