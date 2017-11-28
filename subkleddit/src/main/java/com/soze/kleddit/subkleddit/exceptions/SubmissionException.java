package com.soze.kleddit.subkleddit.exceptions;

import javax.ejb.ApplicationException;

@ApplicationException
public class SubmissionException extends RuntimeException {

  public SubmissionException(String message) {
    super(message);
  }

}
