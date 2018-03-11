package com.soze.kleddit.subkleddit.events;

import com.soze.kleddit.subkleddit.dto.SubmissionReplyDto;
import org.springframework.context.ApplicationEvent;

public class ReplyPostedEvent extends ApplicationEvent {

  private final SubmissionReplyDto submissionReplyDto;

  public ReplyPostedEvent(Object source, SubmissionReplyDto submissionReplyDto) {
    super(source);
    this.submissionReplyDto = submissionReplyDto;
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
