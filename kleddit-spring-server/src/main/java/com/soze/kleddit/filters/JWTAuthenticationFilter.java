package com.soze.kleddit.filters;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.soze.kleddit.user.dto.Jwt;
import com.soze.kleddit.user.dto.LoginForm;
import com.soze.kleddit.user.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Objects;

public class JWTAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

  private final AuthenticationManager authenticationManager;
  private final AuthService authService;

  @Autowired
  public JWTAuthenticationFilter(final AuthenticationManager authenticationManager, final AuthService authService) {
    this.authenticationManager = Objects.requireNonNull(authenticationManager);
    this.authService = Objects.requireNonNull(authService);
  }

  @Override
  public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

    try {
      final LoginForm form = new ObjectMapper().readValue(request.getInputStream(), LoginForm.class);

      return authenticationManager.authenticate(
          new UsernamePasswordAuthenticationToken(
              form.getUsername(),
              form.getPassword(),
              new ArrayList<>()
          )
      );
    } catch (IOException e) {
      throw new RuntimeException(e);
    }

  }

  @Override
  protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException, ServletException {
    final Jwt token = authService.getToken(authResult.getName());
    response.addHeader("Authorization", "BEARER " + token);
  }
}
