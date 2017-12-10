package com.soze.kleddit.subkleddit.entity;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

@Embeddable
public class SubmissionId implements Serializable {

  @Column(name = "submission_id")
  private String submissionId;

  public SubmissionId() {

  }

  public SubmissionId(String submissionId) {
    Objects.requireNonNull(submissionId);
    this.submissionId = UUID.fromString(submissionId).toString();
  }

  public SubmissionId(UUID uuid) {
    this(Objects.requireNonNull(uuid).toString());
  }

  public String getSubmissionId() {
    return submissionId;
  }

  public static SubmissionId randomId() {
    return new SubmissionId(UUID.randomUUID());
  }

  public static SubmissionId fromString(String submissionId) {
    return new SubmissionId(submissionId);
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    SubmissionId submissionId1 = (SubmissionId) o;

    return getSubmissionId().equals(submissionId1.getSubmissionId());
  }

  @Override
  public int hashCode() {
    return getSubmissionId().hashCode();
  }

  @Override
  public String toString() {
    return submissionId;
  }

}
