package com.soze.kleddit.subkleddit.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class SubmissionForm {

  private final String submissionId;
  private final long submissionTime;
  private final String subkledditName;
  private final String title;
  private final String content;

  @JsonCreator
  public SubmissionForm(@JsonProperty("submissionId") String submissionId,
                        @JsonProperty("submissionTime") long submissionTime,
                        @JsonProperty("subkledditName") String subkledditName,
                        @JsonProperty("title") String title,
                        @JsonProperty("content") String content
  ) {
    this.submissionId = Objects.requireNonNull(submissionId);
    this.submissionTime = submissionTime;
    this.subkledditName = Objects.requireNonNull(subkledditName);
    this.title = Objects.requireNonNull(title);
    this.content = Objects.requireNonNull(content);
  }

  public String getSubmissionId() {
    return submissionId;
  }

  public long getSubmissionTime() {
    return submissionTime;
  }

  public String getSubkledditName() {
    return subkledditName;
  }

  public String getTitle() {
    return title;
  }

  public String getContent() {
    return content;
  }

}
