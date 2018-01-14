package com.soze.kleddit.subkleddit.dto;


import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Map;
import java.util.Objects;

public class SubmissionSimpleDto {

  private final String submissionId;
  private final String author;
  private final long createdAt;
  private final String title;
  private final String content;
  private final String subkleddit;
  private final int replyCount;
  private final Map<String, Integer> reactions;

  @JsonCreator
  public SubmissionSimpleDto(@JsonProperty("submissionId") String submissionId,
                             @JsonProperty("author") String author,
                             @JsonProperty("createdAt") long createdAt,
                             @JsonProperty("title") String title,
                             @JsonProperty("content") String content,
                             @JsonProperty("subkleddit") String subkleddit,
                             @JsonProperty("replyCount") int replyCount,
                             @JsonProperty("reactions") Map<String, Integer> reactions
  ) {
    this.submissionId = Objects.requireNonNull(submissionId);
    this.author = Objects.requireNonNull(author);
    this.createdAt = createdAt;
    this.title = Objects.requireNonNull(title);
    this.content = Objects.requireNonNull(content);
    this.subkleddit = Objects.requireNonNull(subkleddit);
    this.replyCount = replyCount;
    this.reactions = Objects.requireNonNull(reactions);
  }

  public String getSubmissionId() {
    return submissionId;
  }

  public String getAuthor() {
    return author;
  }

  public long getCreatedAt() {
    return createdAt;
  }

  public String getContent() {
    return content;
  }

  public String getTitle() {
    return title;
  }

  public String getSubkleddit() {
    return subkleddit;
  }

  public int getReplyCount() {
    return replyCount;
  }

  public Map<String, Integer> getReactions() {
    return reactions;
  }
}
