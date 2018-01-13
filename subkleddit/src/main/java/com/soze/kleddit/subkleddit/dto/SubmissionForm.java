package com.soze.kleddit.subkleddit.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class SubmissionForm {

  private final String subkledditName;
  private final String title;
  private final String content;
  private final String type;

  @JsonCreator
  public SubmissionForm(@JsonProperty("subkledditName") String subkledditName,
                        @JsonProperty("title") String title,
                        @JsonProperty("content") String content,
                        @JsonProperty("type") String type
  ) {
    this.subkledditName = Objects.requireNonNull(subkledditName);
    this.title = Objects.requireNonNull(title);
    this.content = Objects.requireNonNull(content);
    this.type = Objects.requireNonNull(type);
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

  public String getType() {
    return type;
  }

  @Override
  public String toString() {
    return "SubmissionForm{" +
      "subkledditName='" + subkledditName + '\'' +
      ", title='" + title + '\'' +
      ", content='" + content + '\'' +
      ", type='" + type + '\'' +
      '}';
  }
}
