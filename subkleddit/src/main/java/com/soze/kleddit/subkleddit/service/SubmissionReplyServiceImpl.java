package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionReplyForm;
import com.soze.kleddit.subkleddit.entity.SubmissionReply;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.jpa.EntityUUID;

import java.util.List;

public class SubmissionReplyServiceImpl implements SubmissionReplyService {

  @Override
  public SubmissionReply postReply(String username, SubmissionReplyForm form) {
    return null;
  }

  @Override
  public void deleteReply(String username, EntityUUID replyId) {

  }

  @Override
  public List<SubmissionReply> getReplies(EntityUUID submissionId, Pagination pagination) {
    return null;
  }
}
