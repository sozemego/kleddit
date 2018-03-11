package com.soze.kleddit.subkleddit.exceptions;

import java.util.Objects;

public class SubkledditDoesNotExistException extends RuntimeException {

  public SubkledditDoesNotExistException(String message) {
    super(Objects.requireNonNull(message));
  }
}
