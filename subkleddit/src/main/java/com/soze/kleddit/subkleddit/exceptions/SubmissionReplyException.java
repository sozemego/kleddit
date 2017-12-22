package com.soze.kleddit.subkleddit.exceptions;

import javax.ejb.ApplicationException;

@ApplicationException
public class SubmissionReplyException extends RuntimeException {

  public SubmissionReplyException(final String message) {
    super(message);
  }

}
