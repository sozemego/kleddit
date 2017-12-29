package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionReplyForm;
import com.soze.kleddit.subkleddit.entity.SubmissionReply;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.jpa.EntityUUID;

import java.util.List;

public interface SubmissionReplyService {

  /**
   * Attempts to post a reply given form data.
   * @param username author
   * @param form form
   * @return SubmissionReply
   */
  SubmissionReply postReply(String username, SubmissionReplyForm form);

  void deleteReply(String username, EntityUUID replyId);

  void deleteReply(EntityUUID replyId);

  List<SubmissionReply> getReplies(EntityUUID submissionId, Pagination pagination);

}
