package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.jpa.EntityUUID;

import java.util.List;
import java.util.Optional;

public interface SubkledditService {

  List<Subkleddit> getAllSubkleddits();

  /**
   * Attempts to find a subkleddit by name.
   * @param name subkleddit name
   * @return Optional<Subkleddit>
   */
  Optional<Subkleddit> getSubkledditByName(String name);

  /**
   * Used for development to bootstrap the application
   * @param name subkleddit name
   */
  @Deprecated
  void addSubkleddit(String name);

  /**
   * Attempts to find subkleddits by name. This search is case-insensitive and trims white space.
   * @param searchString searchString
   * @return list of found subkleddits
   */
  public List<Subkleddit> searchForSubkledditByName(String searchString);

  void updateSubkleddit(Subkleddit subkleddit);

  Optional<Submission> getSubmissionById(EntityUUID submissionId);

  List<Submission> getSubmissionsForSubkleddit(String subkledditName);

  List<Submission> getSubmissionsForSubkleddit(String subkledditName, Pagination pagination);

  List<Submission> getSubmissionsForSubkleddits(List<String> subkledditNames);

  List<Submission> getSubmissionsForSubkleddits(List<String> subkledditNames, Pagination pagination);

  void updateSubmission(Submission submission);

  void removeSubmission(Submission submission);
}
