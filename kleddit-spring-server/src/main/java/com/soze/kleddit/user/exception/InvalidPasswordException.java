package com.soze.kleddit.user.exception;

import java.util.Objects;

public class InvalidPasswordException extends RuntimeException {

  private final String username;

  public InvalidPasswordException(String username) {
    this.username = Objects.requireNonNull(username);
  }

  public String getUsername() {
    return username;
  }
}
