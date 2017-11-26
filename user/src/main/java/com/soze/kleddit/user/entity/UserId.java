package com.soze.kleddit.user.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class UserId implements Serializable {

  @Column(name = "user_id")
  private String userId;

  public UserId() {

  }

  public UserId(String userId) {
    Objects.requireNonNull(userId);
    this.userId = UUID.fromString(userId).toString();
  }

  public UserId(UUID uuid) {
    this(Objects.requireNonNull(uuid).toString());
  }

  public String getUserId() {
    return userId;
  }

  public static UserId randomId() {
    return new UserId(UUID.randomUUID());
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    UserId userId1 = (UserId) o;

    return getUserId().equals(userId1.getUserId());
  }

  @Override
  public int hashCode() {
    return getUserId().hashCode();
  }

  @Override
  public String toString() {
    return userId;
  }

}
