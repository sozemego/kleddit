package com.soze.kleddit.subkleddit.dto;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class SubmissionSimpleDto {

  private final String submissionId;
  private final String userId;
  private final long createdAt;
  private final String content;

  @JsonCreator
  public SubmissionSimpleDto(@JsonProperty("submissionId") String submissionId,
                             @JsonProperty("userId") String userId,
                             @JsonProperty("createdAt") long createdAt,
                             @JsonProperty("content") String content) {
    this.submissionId = Objects.requireNonNull(submissionId);
    this.userId = Objects.requireNonNull(userId);
    this.createdAt = createdAt;
    this.content = Objects.requireNonNull(content);
  }

  public String getSubmissionId() {
    return submissionId;
  }

  public String getUserId() {
    return userId;
  }

  public long getCreatedAt() {
    return createdAt;
  }

  public String getContent() {
    return content;
  }
}
