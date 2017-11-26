package com.soze.kleddit.subkleddit.exceptions;

import javax.ejb.ApplicationException;

@ApplicationException
public class SubscriptionException extends RuntimeException {

  public SubscriptionException(String message) {
    super(message);
  }

}
