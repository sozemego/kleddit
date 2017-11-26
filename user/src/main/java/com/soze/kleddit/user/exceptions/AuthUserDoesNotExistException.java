package com.soze.kleddit.user.exceptions;

import javax.ejb.ApplicationException;
import java.util.Objects;

@ApplicationException
public class AuthUserDoesNotExistException extends RuntimeException {

  public AuthUserDoesNotExistException(String message) {
    super(Objects.requireNonNull(message));
  }

}
