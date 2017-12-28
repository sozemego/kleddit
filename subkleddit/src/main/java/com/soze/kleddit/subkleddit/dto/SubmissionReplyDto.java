package com.soze.kleddit.subkleddit.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class SubmissionReplyDto {

  private final String replyId;
  private final String submissionId;
  private final long createdAt;
  private final String authorId;
  private final String content;

  @JsonCreator
  public SubmissionReplyDto(@JsonProperty("replyId") String replyId,
                            @JsonProperty("submissionId") String submissionId,
                            @JsonProperty("createdAt") long createdAt,
                            @JsonProperty("authorId") String authorId,
                            @JsonProperty("content") String content) {
    this.replyId = Objects.requireNonNull(replyId);
    this.submissionId = Objects.requireNonNull(submissionId);
    this.createdAt = createdAt;
    this.authorId = Objects.requireNonNull(authorId);
    this.content = Objects.requireNonNull(content);
  }

  public String getReplyId() {
    return replyId;
  }

  public String getSubmissionId() {
    return submissionId;
  }

  public long getCreatedAt() {
    return createdAt;
  }

  public String getAuthorId() {
    return authorId;
  }

  public String getContent() {
    return content;
  }
}