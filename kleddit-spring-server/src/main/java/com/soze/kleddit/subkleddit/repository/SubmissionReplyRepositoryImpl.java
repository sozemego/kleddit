package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.SubmissionReply;
import com.soze.kleddit.subkleddit.exceptions.SubmissionReplyException;
import com.soze.kleddit.utils.jpa.EntityUUID;
import com.soze.kleddit.utils.pagination.Pagination;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Optional;

import static com.soze.kleddit.utils.jpa.QueryUtils.applyPagination;

@Service
public class SubmissionReplyRepositoryImpl implements SubmissionReplyRepository {

  @PersistenceContext
  private EntityManager em;

  @Override
  @Transactional
  public SubmissionReply postReply(SubmissionReply reply) {
    em.persist(reply);
    return reply;
  }

  @Override
  @Transactional
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
    Query query = em.createQuery(
      "SELECT sr FROM SubmissionReply sr WHERE sr.submissionId = :submissionId ORDER BY sr.createdAt DESC"
    );
    query.setParameter("submissionId", submissionId);
    applyPagination(query, pagination);
    return query.getResultList();
  }
}
