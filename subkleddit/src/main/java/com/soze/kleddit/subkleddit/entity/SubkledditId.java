package com.soze.kleddit.subkleddit.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class SubkledditId implements Serializable {

  @Column(name = "subkleddit_id")
  private String subkledditId;

  public SubkledditId() {

  }

  public SubkledditId(String subkledditId) {
    Objects.requireNonNull(subkledditId);
    this.subkledditId = UUID.fromString(subkledditId).toString();
  }

  public SubkledditId(UUID uuid) {
    this(Objects.requireNonNull(uuid).toString());
  }

  public String getSubkledditId() {
    return subkledditId;
  }

  public static SubkledditId randomId() {
    return new SubkledditId(UUID.randomUUID());
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    SubkledditId subkledditId1 = (SubkledditId) o;

    return getSubkledditId().equals(subkledditId1.getSubkledditId());
  }

  @Override
  public int hashCode() {
    return getSubkledditId().hashCode();
  }

  @Override
  public String toString() {
    return subkledditId;
  }

}
