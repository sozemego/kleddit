package com.soze.kleddit.user.exceptions;

import javax.ejb.ApplicationException;

@ApplicationException
public class IdenticalPasswordChangeException extends RuntimeException {

  public IdenticalPasswordChangeException() {

  }


}
