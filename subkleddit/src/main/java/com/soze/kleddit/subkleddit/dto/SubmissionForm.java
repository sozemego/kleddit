package com.soze.kleddit.subkleddit.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class SubmissionForm {

  private final String subkledditName;
  private final String title;
  private final String content;

  @JsonCreator
  public SubmissionForm(@JsonProperty("subkledditName") String subkledditName,
                        @JsonProperty("title") String title,
                        @JsonProperty("content") String content
  ) {
    this.subkledditName = Objects.requireNonNull(subkledditName);
    this.title = Objects.requireNonNull(title);
    this.content = Objects.requireNonNull(content);
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

  @Override
  public String toString() {
    return "SubmissionForm{" +
      ", subkledditName='" + subkledditName + '\'' +
      ", title='" + title + '\'' +
      ", content='" + content + '\'' +
      '}';
  }
}
