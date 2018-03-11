package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.SubmissionReaction;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Objects;

@Service
public class SubmissionReactionRepositoryImpl implements SubmissionReactionRepository {

  @PersistenceContext
  private EntityManager em;

  @Override
  @Transactional
  public void addReaction(final SubmissionReaction reaction) {
    em.persist(reaction);
  }

  @Override
  @Transactional
  public void updateReaction(final SubmissionReaction reaction) {
    Objects.requireNonNull(reaction);
    em.merge(reaction);
  }

  @Override
  @Transactional
  public void deleteReaction(final SubmissionReaction reaction) {
    em.remove(reaction);
  }
}
