package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.api.pagination.PaginationFactory;
import com.soze.kleddit.utils.jpa.EntityUUID;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.soze.kleddit.utils.jpa.QueryUtils.applyPagination;

@Stateless
public class SubkledditRepositoryImpl implements SubkledditRepository {

  @PersistenceContext(name = "subkledditPU")
  private EntityManager em;

  @Override
  public List<Subkleddit> getAllSubkleddits() {
    Query query = em.createQuery("SELECT s FROM Subkleddit s");
    return query.getResultList();
  }

  @Override
  public void addSubkleddit(Subkleddit subkleddit) {
    Objects.requireNonNull(subkleddit);
    em.persist(subkleddit);
  }

  @Override
  public Optional<Subkleddit> getSubkledditByName(String name) {
    Query query = em.createQuery("SELECT s FROM Subkleddit s WHERE UPPER(s.name) = :name");
    query.setParameter("name", name.toUpperCase());

    try {
      return Optional.of((Subkleddit) query.getSingleResult());
    } catch (NoResultException e) {
      return Optional.empty();
    }
  }

  @Override
  public List<Subkleddit> searchForSubkledditByName(String searchString) {
    Objects.requireNonNull(searchString);
    Query query = em.createQuery("SELECT s FROM Subkleddit s WHERE UPPER(s.name) LIKE :searchString");
    query.setParameter("searchString", searchString.toUpperCase());

    return query.getResultList();
  }

  @Override
  public void updateSubkleddit(Subkleddit subkleddit) {
    Objects.requireNonNull(subkleddit);
    em.merge(subkleddit);
  }

  @Override
  public Optional<Submission> getSubmissionById(EntityUUID submissionId) {
    Query query = em.createQuery("SELECT s FROM Submission s WHERE s.submissionId = :submissionId");
    query.setParameter("submissionId", submissionId);
    try {
      return Optional.of((Submission) query.getSingleResult());
    } catch (NoResultException e) {
      return Optional.empty();
    }
  }

  @Override
  public void updateSubmission(Submission submission) {
    Objects.requireNonNull(submission);
    em.merge(submission);
  }

  @Override
  public void removeSubmission(Submission submission) {
    Objects.requireNonNull(submission);
    em.remove(submission);
  }

  @Override
  public List<Submission> getSubmissionsForSubkleddit(String subkledditName) {
    Objects.requireNonNull(subkledditName);
    return getSubmissionsForSubkleddit(subkledditName, PaginationFactory.createPagination());
  }

  @Override
  public List<Submission> getSubmissionsForSubkleddit(String subkledditName, Pagination pagination) {
    Objects.requireNonNull(subkledditName);
    Query query = em.createQuery("SELECT s FROM Submission s WHERE UPPER(s.subkleddit.name) = :subkledditName" +
      " ORDER BY s.createdAt DESC");
    query.setParameter("subkledditName", subkledditName.toUpperCase());
    applyPagination(query, pagination);
    return query.getResultList();
  }

  @Override
  public List<Submission> getSubmissionsForSubkleddits(List<String> subkledditNames) {
    return getSubmissionsForSubkleddits(subkledditNames, PaginationFactory.createPagination());
  }

  @Override
  public List<Submission> getSubmissionsForSubkleddits(List<String> subkledditNames, Pagination pagination) {
    Objects.requireNonNull(subkledditNames);
    Objects.requireNonNull(pagination);
    if (subkledditNames.isEmpty()) {
      return new ArrayList<>();
    }

    Query query = em.createQuery("SELECT s FROM Submission s WHERE UPPER(s.subkleddit.name) IN (:subkleddits) " +
      "ORDER BY s.createdAt DESC");
    query.setParameter("subkleddits", subkledditNames.stream().map(String::toUpperCase).collect(Collectors.toList()));
    applyPagination(query, pagination);
    return query.getResultList();
  }
}
