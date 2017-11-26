package com.soze.kleddit.subkleddit.exceptions;

import javax.ejb.ApplicationException;

@ApplicationException
public class IllegalSubkledditSearchException extends RuntimeException {

  public IllegalSubkledditSearchException(String message) {
    super(message);
  }

}
