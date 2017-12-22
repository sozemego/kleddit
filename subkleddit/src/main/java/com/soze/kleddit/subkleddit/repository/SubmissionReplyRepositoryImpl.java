package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.SubmissionReply;
import com.soze.kleddit.subkleddit.exceptions.SubmissionReplyException;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.jpa.EntityUUID;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Optional;

import static com.soze.kleddit.utils.jpa.QueryUtils.applyPagination;

@Stateless
public class SubmissionReplyRepositoryImpl implements SubmissionReplyRepository {

  @PersistenceContext(name = "subkledditPU")
  private EntityManager em;

  @Override
  public SubmissionReply postReply(SubmissionReply reply) {
    em.persist(reply);
    return reply;
  }

  @Override
  public void deleteReply(EntityUUID replyId) {
    SubmissionReply reply = getSubmissionReplyById(replyId).orElseThrow(() -> new SubmissionReplyException("Submission with id " + replyId + " does not exist."));
    em.remove(reply);
  }

  @Override
  public Optional<SubmissionReply> getSubmissionReplyById(EntityUUID replyId) {
    return Optional.ofNullable(em.find(SubmissionReply.class, replyId));
  }

  @Override
  public List<SubmissionReply> getReplies(EntityUUID submissionId, Pagination pagination) {
    Query query = em.createQuery("SELECT r FROM SubmissionReply r WHERE r.submissionId = :submissionId ORDER BY r.createdAt DESC");
    query.setParameter("submissionId", submissionId);
    applyPagination(query, pagination);
    return query.getResultList();
  }
}
