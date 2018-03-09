package com.soze.kleddit;

import com.soze.kleddit.filters.JWTAuthenticationFilter;
import com.soze.kleddit.filters.JWTAuthorizationFilter;
import com.soze.kleddit.user.service.AuthService;
import com.soze.kleddit.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Objects;

@EnableWebSecurity
public class KledditSecurityConfiguration extends WebSecurityConfigurerAdapter {

    private final UserService userService;
    private final AuthService authService;

    @Autowired
    public KledditSecurityConfiguration(final UserService userService, final AuthService authService) {
        this.userService = Objects.requireNonNull(userService);
        this.authService = Objects.requireNonNull(authService);
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
            .cors()
            .and()
                .csrf().disable()
            .authorizeRequests()
                .antMatchers(HttpMethod.OPTIONS).permitAll()
                .antMatchers("/api/0.1/user/register").permitAll()
                .antMatchers("/api/0.1/user/auth/login").permitAll()
                .anyRequest().authenticated()
            .and()
                .addFilter(new JWTAuthenticationFilter(authenticationManager(), authService))
                .addFilter(new JWTAuthorizationFilter(authenticationManager(), authService))
            // this disables session creation on Spring Security
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
    }

    @Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

}
