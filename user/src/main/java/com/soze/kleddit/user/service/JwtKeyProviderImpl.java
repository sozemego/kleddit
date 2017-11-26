package com.soze.kleddit.user.service;

import javax.ejb.Stateless;

@Stateless
public class JwtKeyProviderImpl implements JwtKeyProvider {

  @Override
  public byte[] getSecret() {
    return "COOL SECRET BRO".getBytes();
  }
}
