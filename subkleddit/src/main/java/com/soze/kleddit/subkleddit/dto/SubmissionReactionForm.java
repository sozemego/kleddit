package com.soze.kleddit.subkleddit.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class SubmissionReactionForm {

  private final String submissionId;
  private final String reactionType;

  @JsonCreator
  public SubmissionReactionForm(@JsonProperty("submissionId") final String submissionId,
                                @JsonProperty("reactionType") final String reactionType) {
    this.submissionId = Objects.requireNonNull(submissionId);
    this.reactionType = Objects.requireNonNull(reactionType);
  }

  public String getSubmissionId() {
    return submissionId;
  }

  public String getReactionType() {
    return reactionType;
  }

  @Override
  public String toString() {
    return "SubmissionReactionForm{" +
      "submissionId='" + submissionId + '\'' +
      ", reactionType='" + reactionType + '\'' +
      '}';
  }
}
