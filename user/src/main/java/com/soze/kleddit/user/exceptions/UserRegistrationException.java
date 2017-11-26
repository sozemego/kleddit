package com.soze.kleddit.user.exceptions;

import javax.ejb.ApplicationException;
import java.util.Objects;

/**
 * Thrown when a problem with registration occurred.
 */
@ApplicationException
public class UserRegistrationException extends RuntimeException {

  private final String field;

  public UserRegistrationException(String field, String message) {
    super(message);
    this.field = Objects.requireNonNull(field);
  }

  public String getField() {
    return field;
  }
}
