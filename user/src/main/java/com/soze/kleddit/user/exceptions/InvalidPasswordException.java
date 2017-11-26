package com.soze.kleddit.user.exceptions;

import javax.ejb.ApplicationException;
import java.util.Objects;

@ApplicationException
public class InvalidPasswordException extends RuntimeException {

  private final String username;

  public InvalidPasswordException(String username) {
    this.username = Objects.requireNonNull(username);
  }

  public String getUsername() {
    return username;
  }
}
