package com.soze.kleddit.user.exception;

import java.util.Objects;

public class AuthUserDoesNotExistException extends RuntimeException {

  public AuthUserDoesNotExistException(String message) {
    super(Objects.requireNonNull(message));
  }

}
