package com.soze.kleddit.user.service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.Claim;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.soze.kleddit.user.dto.ChangePasswordForm;
import com.soze.kleddit.user.dto.Jwt;
import com.soze.kleddit.user.dto.LoginForm;
import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.user.exception.AuthUserDoesNotExistException;
import com.soze.kleddit.user.exception.IdenticalPasswordChangeException;
import com.soze.kleddit.user.exception.InvalidPasswordException;
import com.soze.kleddit.user.password.PasswordHash;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.Objects;
import java.util.Optional;

@Service
public class AuthServiceImpl implements AuthService {

  private static final String ISSUER = "kleddit";
  private static final String USER_NAME_CLAIM = "username";
  private Algorithm algorithm;

  @Autowired
  private JwtKeyProvider keyProvider;

  @Autowired
  private UserService userService;

  @Autowired
  private PasswordHash passwordHash;

  @PostConstruct
  public void setup() {
    algorithm = Algorithm.HMAC256(keyProvider.getSecret());
  }

  @Override
  public Jwt login(LoginForm loginForm) {
    validateLogin(loginForm);

    return new Jwt(
        JWT.create()
            .withIssuer(ISSUER)
            .withClaim(USER_NAME_CLAIM, loginForm.getUsername())
            .sign(algorithm)
    );
  }

  @Override
  public Jwt getToken(final String username) {
    return new Jwt(
        JWT.create()
            .withIssuer(ISSUER)
            .withClaim(USER_NAME_CLAIM, username)
            .sign(algorithm)
    );
  }

  //TODO refactor this, move somewhere else?
  private void validateLogin(LoginForm form) {
    Objects.requireNonNull(form);
    User user = getUserByUsername(form.getUsername()).<AuthUserDoesNotExistException>orElseThrow(() -> {
      form.reset();
      throw new AuthUserDoesNotExistException("Username " + form.getUsername());
    });

    boolean passwordMatches = passwordHash.matches(form.getPassword(), user.getPasswordHash());
    if (!passwordMatches) {
      form.reset();
      throw new InvalidPasswordException(form.getUsername());
    }

    form.reset();
  }

  @Override
  public void logout(String token) {

  }

  @Override
  public boolean validateToken(String token) {
    Objects.requireNonNull(token);

    try {
      decodeToken(token);
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }

    return true;
  }

  private DecodedJWT decodeToken(String token) {
    return JWT.require(algorithm).build().verify(token);
  }

  @Override
  public String getUsernameClaim(String token) {
    DecodedJWT decodedJWT = decodeToken(token);
    Claim claim = decodedJWT.getClaim(USER_NAME_CLAIM);
    if (claim.isNull()) {
      //TODO make own exception
      throw new IllegalArgumentException("NO USERNAME CLAIM");
    }
    return claim.asString();
  }

  @Override
  public void passwordChange(String username, ChangePasswordForm changePasswordForm) {
    validatePasswordChange(username, changePasswordForm);

    userService.changeUserPassword(username, passwordHash.hashWithSalt(changePasswordForm.getNewPassword()));
    changePasswordForm.reset();
  }

  private void validatePasswordChange(String username, ChangePasswordForm form) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(form);

    User user = getUserByUsername(username).<AuthUserDoesNotExistException>orElseThrow(() -> {
      form.reset();
      throw new AuthUserDoesNotExistException(username);
    });

    if (Arrays.equals(form.getNewPassword(), form.getOldPassword())) {
      form.reset();
      throw new IdenticalPasswordChangeException();
    }

    boolean passwordMatches = passwordHash.matches(form.getOldPassword(), user.getPasswordHash());
    if (!passwordMatches) {
      form.reset();
      throw new InvalidPasswordException(username);
    }
  }

  private Optional<User> getUserByUsername(String username) {
    return userService.getUserByUsername(username);
  }

}
