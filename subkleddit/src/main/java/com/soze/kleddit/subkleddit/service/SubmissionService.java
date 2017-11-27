package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.entity.Submission;

import java.util.List;

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

}
