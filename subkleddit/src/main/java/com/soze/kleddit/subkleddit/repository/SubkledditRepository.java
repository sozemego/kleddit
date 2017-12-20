package com.soze.kleddit.subkleddit.repository;


import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.jpa.EntityUUID;

import java.util.List;
import java.util.Optional;

public interface SubkledditRepository {

  List<Subkleddit> getAllSubkleddits();

  void addSubkleddit(Subkleddit subkleddit);

  Optional<Subkleddit> getSubkledditByName(String name);

  List<Subkleddit> searchForSubkledditByName(String searchString);

  void updateSubkleddit(Subkleddit subkleddit);

  Optional<Submission> getSubmissionById(EntityUUID submissionId);

  void updateSubmission(Submission submission);

  void removeSubmission(Submission submission);

  List<Submission> getSubmissionsForSubkleddit(String subkledditName);

  List<Submission> getSubmissionsForSubkleddit(String subkledditName, Pagination pagination);

  List<Submission> getSubmissionsForSubkleddits(List<String> subkledditNames);

  List<Submission> getSubmissionsForSubkleddits(List<String> subkledditNames, Pagination pagination);


}
