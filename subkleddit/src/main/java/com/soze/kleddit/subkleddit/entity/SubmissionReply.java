package com.soze.kleddit.subkleddit.entity;


import com.soze.kleddit.utils.jpa.EntityUUID;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "submission_replies")
public class SubmissionReply {

  @EmbeddedId
  private EntityUUID id;

  public SubmissionReply() {}

  public EntityUUID getId() {
    return id;
  }

  public void setId(EntityUUID id) {
    this.id = id;
  }
}
