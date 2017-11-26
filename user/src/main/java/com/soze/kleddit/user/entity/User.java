package com.soze.kleddit.user.entity;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.OffsetDateTime;

@Entity
@Table(
  name = "users",
  uniqueConstraints = @UniqueConstraint(columnNames = {"username"})
)
public class User {

  @EmbeddedId
  private UserId userId;

  @Column(name = "username")
  @Size(min = 1, max = 50)
  @NotNull
  private String username;

  @Column(name = "password_hash")
  @NotNull
  private String passwordHash;

  @Column(name = "created_at")
  private OffsetDateTime createdAt;

  @Column(name = "nuked")
  private boolean nuked;

  public User() {

  }

  public UserId getUserId() {
    return userId;
  }

  public void setUserId(UserId userId) {
    this.userId = userId;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPasswordHash() {
    return passwordHash;
  }

  public void setPasswordHash(String passwordHash) {
    this.passwordHash = passwordHash;
  }

  public OffsetDateTime getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(OffsetDateTime createdAt) {
    this.createdAt = createdAt;
  }

  public boolean getNuked() {
    return nuked;
  }

  public void setNuked(boolean nuked) {
    this.nuked = nuked;
  }

  @Override
  public String toString() {
    return "User{" +
      "userId=" + userId +
      ", username='" + username + '\'' +
      ", passwordHash='" + passwordHash + '\'' +
      ", createdAt=" + createdAt +
      '}';
  }
}
