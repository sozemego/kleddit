package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.subkleddit.entity.SubmissionId;
import com.soze.kleddit.utils.api.pagination.Pagination;

import java.util.List;
import java.util.Optional;

public interface SubmissionService {

  /**
   * Attempts to submit a given submission.
   * @param username author of the submission
   * @param form form with submission data
   */
  void submit(String username, SubmissionForm form);

  /**
   * Returns a list of submissions to a given subkleddit.
   * @param subkledditName subkleddit name
   */
  List<Submission> getSubmissions(String subkledditName);

  /**
   * Returns a paginated list of
   * @param subkledditName subkleddit name
   * @param pagination pagination options
   */
  List<Submission> getSubmissions(String subkledditName, Pagination pagination);

  /**
   * Returns a list of submissions from subkleddits a given user is subscribed to.
   * @param username username
   * @return list of submissions
   */
  List<Submission> getSubmissionsForUser(String username);

  List<Submission> getSubmissionsForUser(String username, Pagination pagination);

  /**
   * Given user attempts to delete a submission with submissionId.
   */
  void deleteSubmission(String username, SubmissionId submissionId);

  Optional<Submission> getSubmissionById(SubmissionId submissionId);

}
