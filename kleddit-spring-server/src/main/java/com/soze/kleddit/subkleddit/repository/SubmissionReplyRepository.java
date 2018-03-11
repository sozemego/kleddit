package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.SubmissionReply;
import com.soze.kleddit.utils.jpa.EntityUUID;
import com.soze.kleddit.utils.pagination.Pagination;

import java.util.List;
import java.util.Optional;

public interface SubmissionReplyRepository {

  SubmissionReply postReply(SubmissionReply reply);

  void deleteReply(EntityUUID replyId);

  Optional<SubmissionReply> getSubmissionReplyById(EntityUUID replyId);

  List<SubmissionReply> getReplies(EntityUUID submissionId, Pagination pagination);

}
