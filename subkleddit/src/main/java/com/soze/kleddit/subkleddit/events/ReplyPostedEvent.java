package com.soze.kleddit.subkleddit.events;

import com.soze.kleddit.subkleddit.dto.SubmissionReplyDto;

import java.util.Objects;

public class ReplyPostedEvent {

  private final SubmissionReplyDto submissionReplyDto;

  public ReplyPostedEvent(final SubmissionReplyDto submissionReplyDto) {
    this.submissionReplyDto = Objects.requireNonNull(submissionReplyDto);
  }

  public SubmissionReplyDto getSubmissionReplyDto() {
    return submissionReplyDto;
  }

  @Override
  public String toString() {
    return "PostedReplyEvent{" +
      "submissionReplyDto=" + submissionReplyDto +
      '}';
  }
}
