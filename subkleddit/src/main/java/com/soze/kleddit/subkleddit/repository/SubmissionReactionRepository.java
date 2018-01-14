package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.SubmissionReaction;

public interface SubmissionReactionRepository {

  void addReaction(SubmissionReaction reaction);

  void updateReaction(SubmissionReaction reaction);

  void deleteReaction(SubmissionReaction reaction);

}
