package com.soze.kleddit.user.service;

public interface JwtKeyProvider {

  byte[] getSecret();

}
