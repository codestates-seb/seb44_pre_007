package com.seb_pre_007.Server.config;

import com.seb_pre_007.Server.OAuth2.handler.OAuth2UserSuccessHandler;
import com.seb_pre_007.Server.auth.filter.JwtAuthenticationFilter;
import com.seb_pre_007.Server.auth.filter.JwtVerificationFilter;
import com.seb_pre_007.Server.auth.handler.UserAccessDeniedHandler;
import com.seb_pre_007.Server.auth.handler.UserAuthenticationEntryPoint;
import com.seb_pre_007.Server.auth.handler.UserAuthenticationFailureHandler;
import com.seb_pre_007.Server.auth.handler.UserAuthenticationSuccessHandler;
import com.seb_pre_007.Server.auth.jwt.JwtTokenizer;
import com.seb_pre_007.Server.auth.utils.CustomAuthorityUtils;
import com.seb_pre_007.Server.user.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig  {

    private final JwtTokenizer jwtTokenizer;
    private final CustomAuthorityUtils authorityUtils;
    private final UserService userService;

    public SecurityConfig(JwtTokenizer jwtTokenizer, CustomAuthorityUtils authorityUtils, UserService userService) {
        this.jwtTokenizer = jwtTokenizer;
        this.authorityUtils = authorityUtils;
        this.userService = userService;
    }

    // 시큐리티 필터 체인
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .headers().frameOptions().sameOrigin()
                .and()
                .csrf().disable() // CSRF 토큰 미사용 (JWT 토큰 사용)
                .cors(withDefaults()) // CORS 적용
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS) // 세션 미사용
                .and()
                .formLogin().disable()
                .httpBasic().disable()
                .exceptionHandling() // 예외 처리 핸들러 설정
                .authenticationEntryPoint(new UserAuthenticationEntryPoint())
                .accessDeniedHandler(new UserAccessDeniedHandler())
                .and()
                .apply(new CustomFilterConfigurer()) // 커스텀 필터 설정 추가
                .and()
                // 시큐리티 적용할 URL 패턴 매칭
                .authorizeHttpRequests(authorize -> authorize

                        .antMatchers(HttpMethod.POST, "/questions/**").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.PATCH, "/questions/**").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.PATCH,"/users/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE,"/users/**").hasAnyRole("USER", "ADMIN")
                        .antMatchers(HttpMethod.DELETE, "/questions/**").hasAnyRole("USER","ADMIN")
                        .antMatchers(HttpMethod.GET, "/questions/**").permitAll()
                        .anyRequest().permitAll()
                )
                // OAuth2 로그인 적용
                .oauth2Login(oauth2 -> oauth2
                        // 소셜 로그인 성공 시 수행되는 핸들러 설정
                        .successHandler(new OAuth2UserSuccessHandler(jwtTokenizer, authorityUtils, userService))
                );
        return http.build();
    }

    @Bean
    public static PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    // CORS 설정
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET","POST", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*")); // 클라이언트에서 요청할 때 허용할 요청 헤더 설정
        configuration.setExposedHeaders(Arrays.asList("*")); // 클라이언트로 노출할 응답 헤더 설정

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    // 일반 로그인 인증 필터, 헤더로 전달된 JWT 토큰 검증 필터 설정
    public class CustomFilterConfigurer extends AbstractHttpConfigurer<CustomFilterConfigurer, HttpSecurity> {
        @Override
        public void configure(HttpSecurity builder) throws Exception {
            AuthenticationManager authenticationManager = builder.getSharedObject(AuthenticationManager.class);

            // 일반 로그인 인증 처리 필터 생성하고, 해당 필터에 진입 url, 성공/실패 핸들러 세팅
            JwtAuthenticationFilter jwtAuthenticationFilter = new JwtAuthenticationFilter(authenticationManager, jwtTokenizer);
            jwtAuthenticationFilter.setFilterProcessesUrl("/login");

            jwtAuthenticationFilter.setAuthenticationSuccessHandler(new UserAuthenticationSuccessHandler());
            jwtAuthenticationFilter.setAuthenticationFailureHandler(new UserAuthenticationFailureHandler());

            // JWT 토큰 검증 필터 생성 및 필터 순서 설정 : 인증(일반로그인 or 소셜로그인) 필터 다음에 적용
            JwtVerificationFilter jwtVerificationFilter = new JwtVerificationFilter(jwtTokenizer, authorityUtils);
            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, JwtAuthenticationFilter.class);
            builder.addFilter(jwtAuthenticationFilter)
                    .addFilterAfter(jwtVerificationFilter, OAuth2LoginAuthenticationFilter.class);
        }
    }

}
