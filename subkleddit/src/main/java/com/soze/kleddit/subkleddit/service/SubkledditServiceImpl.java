package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.entity.SubkledditId;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.subkleddit.entity.SubmissionId;
import com.soze.kleddit.subkleddit.exceptions.IllegalSubkledditSearchException;
import com.soze.kleddit.subkleddit.repository.SubkledditRepository;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.api.pagination.PaginationFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Stateless
public class SubkledditServiceImpl implements SubkledditService {

  private static final Logger LOG = LoggerFactory.getLogger(SubkledditServiceImpl.class);
  private static final int MAX_SUBKLEDDIT_NAME_LENGTH = 100;

  @Inject
  private SubkledditRepository repository;

  @Override
  public List<Subkleddit> getAllSubkleddits() {
    return repository.getAllSubkleddits();
  }

  @Override
  public void addSubkleddit(String name) {
    Objects.requireNonNull(name);

    Subkleddit subkleddit = new Subkleddit();
    subkleddit.setSubkledditId(SubkledditId.randomId());
    subkleddit.setName(name);

    LOG.info("Adding subkleddit with name [{}]", name);

    repository.addSubkleddit(subkleddit);
  }

  @Override
  public List<Subkleddit> searchForSubkledditByName(String searchString) {
    Objects.requireNonNull(searchString);
    return repository.searchForSubkledditByName(searchString);
  }

  @Override
  public void updateSubkleddit(Subkleddit subkleddit) {
    Objects.requireNonNull(subkleddit);
    repository.updateSubkleddit(subkleddit);
  }

  @Override
  public Optional<Submission> getSubmissionById(SubmissionId submissionId) {
    Objects.requireNonNull(submissionId);
    return repository.getSubmissionById(submissionId);
  }

  @Override
  public List<Submission> getSubmissionsForSubkleddit(String subkledditName) {
    Objects.requireNonNull(subkledditName);
    return getSubmissionsForSubkleddit(subkledditName, PaginationFactory.createPagination());
  }

  @Override
  public List<Submission> getSubmissionsForSubkleddit(String subkledditName, Pagination pagination) {
    Objects.requireNonNull(subkledditName);
    Objects.requireNonNull(pagination);
    return repository.getSubmissionsForSubkleddit(subkledditName, pagination);
  }

  @Override
  public List<Submission> getSubmissionsForSubkleddits(List<String> subkledditNames) {
    return getSubmissionsForSubkleddits(subkledditNames, PaginationFactory.createPagination());
  }

  @Override
  public List<Submission> getSubmissionsForSubkleddits(List<String> subkledditNames, Pagination pagination) {
    Objects.requireNonNull(subkledditNames);
    Objects.requireNonNull(pagination);
    return repository.getSubmissionsForSubkleddits(subkledditNames, pagination);
  }

  @Override
  public void updateSubmission(Submission submission) {
    Objects.requireNonNull(submission);
    repository.updateSubmission(submission);
  }

  @Override
  public void removeSubmission(Submission submission) {
    Objects.requireNonNull(submission);
    repository.removeSubmission(submission);
  }

  @Override
  public Optional<Subkleddit> getSubkledditByName(String name) {
    Objects.requireNonNull(name);

    if(name.length() > MAX_SUBKLEDDIT_NAME_LENGTH) {
      throw new IllegalSubkledditSearchException("Given subkleddit name was too long. Maximum character length is " + MAX_SUBKLEDDIT_NAME_LENGTH);
    }

    return repository.getSubkledditByName(name);
  }

}
