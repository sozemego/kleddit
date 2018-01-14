package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.SubmissionReaction;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.Objects;

public class SubmissionReactionRepositoryImpl implements SubmissionReactionRepository {

  @PersistenceContext(name = "subkledditPU")
  private EntityManager em;

  @Override
  public void addReaction(final SubmissionReaction reaction) {
    em.persist(reaction);
  }

  @Override
  public void updateReaction(final SubmissionReaction reaction) {
    Objects.requireNonNull(reaction);
    em.merge(reaction);
  }

  @Override
  public void deleteReaction(final SubmissionReaction reaction) {
    em.remove(reaction);
  }
}
