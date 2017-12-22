package com.soze.kleddit.utils.jpa;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class EntityUUID implements Serializable {

  @Column(name = "id")
  @org.hibernate.annotations.Type(type="org.hibernate.type.PostgresUUIDType")
  private UUID id;

  public EntityUUID() {}

  public EntityUUID(String id) {
    Objects.requireNonNull(id);
    this.id = UUID.fromString(id);
  }

  public EntityUUID(UUID id) {
    this(id.toString());
  }

  public static EntityUUID randomId() {
    return new EntityUUID(UUID.randomUUID());
  }

  public static EntityUUID fromString(String id) {
    return new EntityUUID(id);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    EntityUUID that = (EntityUUID) o;

    return id.equals(that.id);
  }

  @Override
  public int hashCode() {
    return id.hashCode();
  }

  @Override
  public String toString() {
    return id.toString();
  }

}
