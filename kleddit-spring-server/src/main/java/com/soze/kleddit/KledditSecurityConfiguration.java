package com.soze.kleddit;

import com.google.common.collect.ImmutableList;
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
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

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
      .cors().configurationSource(corsConfigurationSource())
      .and()
        .csrf().disable()
      .authorizeRequests()
        .antMatchers("/api/0.1/user/register").permitAll()
        .antMatchers("/api/0.1/user/auth/login").permitAll()
        .antMatchers("/api/0.1/user/single/available/*").permitAll()
        .antMatchers("/api/0.1/user/single/*").permitAll()
        .antMatchers("/api/0.1/subkleddit/all").permitAll()
        .antMatchers("/api/0.1/subkleddit/single/*").permitAll()
        .antMatchers("/api/0.1/subkleddit/search/*").permitAll()
        .antMatchers("/api/0.1/subkleddit/subscription/subkleddit/subscriptions/*").permitAll()
        .antMatchers("/api/0.1/subkleddit/user/subkleddits/*").permitAll()
        .antMatchers("/api/0.1/subkleddit/submission/subkleddit/*").permitAll()
        .antMatchers("/api/0.1/subkleddit/single/*").permitAll()
        .antMatchers(HttpMethod.GET, "/api/0.1/subkleddit/submission/reply/*").permitAll()
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

  @Bean
  public CorsConfigurationSource corsConfigurationSource() {
    final CorsConfiguration configuration = new CorsConfiguration();
    configuration.setAllowedOrigins(ImmutableList.of("*"));
    configuration.setAllowedMethods(ImmutableList.of("HEAD",
      "GET", "POST", "PUT", "DELETE", "PATCH"));
    // setAllowCredentials(true) is important, otherwise:
    // The value of the 'Access-Control-Allow-Origin' header in the response must not be the wildcard '*' when the request's credentials mode is 'include'.
    configuration.setAllowCredentials(true);
    // setAllowedHeaders is important! Without it, OPTIONS preflight request
    // will fail with 403 Invalid CORS request
    configuration.setAllowedHeaders(ImmutableList.of("Authorization", "Cache-Control", "Content-Type"));
    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", configuration);
    return source;
  }

}
