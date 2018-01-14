package com.soze.kleddit.subkleddit.entity;

import com.soze.kleddit.utils.jpa.EntityUUID;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "submission_reactions")
public class SubmissionReaction {

  @EmbeddedId
  @AttributeOverride(name = "id", column = @Column(name = "submission_reaction_id"))
  private EntityUUID submissionReactionId;

  @AttributeOverride(name = "id", column = @Column(name = "submission_id"))
  private EntityUUID submissionId;

  @AttributeOverride(name = "id", column = @Column(name = "user_id"))
  private EntityUUID userId;

  @Column(name = "reaction_type")
  @Enumerated(EnumType.STRING)
  private ReactionType reactionType;

  public SubmissionReaction() {

  }

  public EntityUUID getSubmissionReactionId() {
    return submissionReactionId;
  }

  public void setSubmissionReactionId(final EntityUUID submissionReactionId) {
    this.submissionReactionId = submissionReactionId;
  }

  public EntityUUID getUserId() {
    return userId;
  }

  public void setUserId(final EntityUUID userId) {
    this.userId = userId;
  }

  public ReactionType getReactionType() {
    return reactionType;
  }

  public void setReactionType(final ReactionType reactionType) {
    this.reactionType = reactionType;
  }

  public EntityUUID getSubmissionId() {
    return submissionId;
  }

  public void setSubmissionId(final EntityUUID submissionId) {
    this.submissionId = submissionId;
  }

  public enum ReactionType {
    LIKE, LAUGH, LOVE, DISLIKE, HATE;
  }

  @Override
  public String toString() {
    return "SubmissionReaction{" +
      "submissionReactionId=" + submissionReactionId +
      ", submissionId=" + submissionId +
      ", userId=" + userId +
      ", reactionType=" + reactionType +
      '}';
  }

  @Override
  public boolean equals(final Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    final SubmissionReaction reaction = (SubmissionReaction) o;
    return Objects.equals(getSubmissionReactionId(), reaction.getSubmissionReactionId());
  }

  @Override
  public int hashCode() {

    return Objects.hash(getSubmissionReactionId());
  }
}
