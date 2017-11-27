package com.soze.kleddit.subkleddit.exceptions;

import javax.ejb.ApplicationException;
import java.util.Objects;

@ApplicationException
public class SubkledditDoesNotExistException extends RuntimeException {

  public SubkledditDoesNotExistException(String message) {
    super(Objects.requireNonNull(message));
  }
}
