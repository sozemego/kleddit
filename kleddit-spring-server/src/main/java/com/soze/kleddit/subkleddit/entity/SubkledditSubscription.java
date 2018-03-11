package com.soze.kleddit.subkleddit.entity;

import com.soze.kleddit.utils.jpa.EntityUUID;

import javax.persistence.*;

@Entity
@Table(
  name = "subkleddit_subscriptions",
  uniqueConstraints = {@UniqueConstraint(columnNames = {"subkleddit_name", "user_id"})}
)
public class SubkledditSubscription {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private long id;

  @Column(name = "subkleddit_name")
  private String subkledditName;

  @Column(name = "user_id")
  @AttributeOverride(name = "id", column = @Column(name = "user_id"))
  private EntityUUID userId;

  public SubkledditSubscription() {

  }

  public String getSubkledditName() {
    return subkledditName;
  }

  public void setSubkledditName(String subkledditName) {
    this.subkledditName = subkledditName;
  }

  public long getId() {
    return id;
  }

  public void setId(long id) {
    this.id = id;
  }

  public EntityUUID getUserId() {
    return userId;
  }

  public void setUserId(EntityUUID userId) {
    this.userId = userId;
  }
}
