package com.soze.kleddit.subkleddit.entity;

import javax.persistence.*;

@Entity
@Table(
  name = "subkleddits",
  uniqueConstraints = @UniqueConstraint(columnNames = {"name"})
)
public class Subkleddit {

  @EmbeddedId
  private SubkledditId subkledditId;

  @Column(name = "name")
  private String name;

  public Subkleddit() {

  }

  public SubkledditId getSubkledditId() {
    return subkledditId;
  }

  public void setSubkledditId(SubkledditId subkledditId) {
    this.subkledditId = subkledditId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }
}
