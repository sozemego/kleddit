package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.SubmissionReply;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.jpa.EntityUUID;

import java.util.List;

public interface SubmissionReplyRepository {

  public SubmissionReply postReply(SubmissionReply reply);

  public void deleteReply(EntityUUID replyId);

  public List<SubmissionReply> getReplies(EntityUUID submissionId, Pagination pagination);

}
