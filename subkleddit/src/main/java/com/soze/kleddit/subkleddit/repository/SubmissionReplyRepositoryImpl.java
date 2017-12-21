package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.SubmissionReply;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.jpa.EntityUUID;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

public class SubmissionReplyRepositoryImpl implements SubmissionReplyRepository {

  @PersistenceContext(name = "subkledditPU")
  private EntityManager em;

  @Override
  public SubmissionReply postReply(SubmissionReply reply) {
    return null;
  }

  @Override
  public void deleteReply(EntityUUID replyId) {

  }

  @Override
  public List<SubmissionReply> getReplies(EntityUUID submissionId, Pagination pagination) {
    return null;
  }
}
