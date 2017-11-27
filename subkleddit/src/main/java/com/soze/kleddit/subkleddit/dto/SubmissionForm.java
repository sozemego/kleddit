package com.soze.kleddit.subkleddit.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.soze.kleddit.subkleddit.entity.SubmissionId;

import java.time.OffsetDateTime;
import java.util.Objects;

public class SubmissionForm {

  private final OffsetDateTime submissionTime;
  private final SubmissionId submissionId;
  private final String subkledditName;
  private final String content;

  @JsonCreator
  public SubmissionForm(@JsonProperty("submissionId") SubmissionId submissionId,
                        @JsonProperty("submissionTime") OffsetDateTime submissionTime,
                        @JsonProperty("subkledditName") String subkledditName,
                        @JsonProperty("content") String content) {
    this.submissionId = Objects.requireNonNull(submissionId);
    this.submissionTime = Objects.requireNonNull(submissionTime);
    this.subkledditName = Objects.requireNonNull(subkledditName);
    this.content = Objects.requireNonNull(content);
  }

  public SubmissionId getSubmissionId() {
    return submissionId;
  }

  public OffsetDateTime getSubmissionTime() {
    return submissionTime;
  }

  public String getSubkledditName() {
    return subkledditName;
  }

  public String getContent() {
    return content;
  }
}
