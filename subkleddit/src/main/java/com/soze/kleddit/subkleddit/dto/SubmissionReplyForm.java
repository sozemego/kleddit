package com.soze.kleddit.subkleddit.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class SubmissionReplyForm {

  private final String submissionId;
  private final String content;

  @JsonCreator
  public SubmissionReplyForm(@JsonProperty("submissionId") String submissionId,
                             @JsonProperty("content") String content) {
    this.submissionId = Objects.requireNonNull(submissionId);
    this.content = Objects.requireNonNull(content);
  }

  public String getSubmissionId() {
    return submissionId;
  }

  public String getContent() {
    return content;
  }

  @Override
  public String toString() {
    return "SubmissionReplyForm{" +
      ", submissionId='" + submissionId + '\'' +
      ", content='" + content + '\'' +
      '}';
  }
}
