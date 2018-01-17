package com.soze.kleddit.user.service;

import javax.ejb.Stateless;

@Stateless
public class JwtKeyProviderImpl implements JwtKeyProvider {

  private static final byte[] SECRET = System.getenv("KLEDDIT_JWT_SECRET").getBytes();

  @Override
  public byte[] getSecret() {
    return SECRET;
  }
}
