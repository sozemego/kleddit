package com.soze.kleddit.user.service;

import com.soze.kleddit.user.dto.ChangePasswordForm;
import com.soze.kleddit.user.dto.Jwt;
import com.soze.kleddit.user.dto.LoginForm;
import com.soze.kleddit.user.exceptions.AuthUserDoesNotExistException;
import com.soze.kleddit.user.exceptions.InvalidPasswordException;

public interface AuthService {

  /**
   * Attempts to authenticate the user and returns a token
   * used to identify the user.
   *
   * loginForm cannot be null, NullPointerException will be thrown if it is.
   *
   * @param loginForm loginForm
   *
   * @throws NullPointerException if loginForm is null, or username in loginForm is null
   * @throws AuthUserDoesNotExistException if user with username specified in loginForm does not exist
   * @throws InvalidPasswordException if password given by user is invalid
   * @return jwt
   */
  Jwt login(LoginForm loginForm);

  /**
   * Given a token, logs out the user. For now, the method will only
   * log that user logged out. Client-side, cookie will be removed.
   * @param token jwt
   */
  void logout(String token);

  /**
   * Validates a given JWT. Returns true if it's valid, false otherwise.
   * This method does not check any claims, just checks whether the token
   * was tampered with.
   */
  boolean validateToken(String token);

  /**
   * Returns username claim from a given token.
   */
  String getUsernameClaim(String token);

  /**
   * Attempts to change user's password.
   * If the old password does not match, throws InvalidPasswordException
   * @param changePasswordForm changePasswordForm
   *
   * @throws NullPointerException if changePasswordForm is null
   * @throws InvalidPasswordException if old password given does not match current password
   */
  void passwordChange(String username, ChangePasswordForm changePasswordForm);

}
