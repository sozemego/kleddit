package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.subkleddit.entity.SubmissionId;
import com.soze.kleddit.subkleddit.exceptions.SubkledditDoesNotExistException;
import com.soze.kleddit.subkleddit.exceptions.SubmissionException;
import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.user.exceptions.AuthUserDoesNotExistException;
import com.soze.kleddit.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Stateless
public class SubmissionServiceImpl implements SubmissionService {

  private static final Logger LOG = LoggerFactory.getLogger(SubmissionServiceImpl.class);

  @Inject
  private SubkledditService subkledditService;

  @Inject
  private SubkledditSubscriptionService subkledditSubscriptionService;

  @Inject
  private UserService userService;

  @Override
  public void submit(String username, SubmissionForm form) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(form);
    String subkledditName = form.getSubkledditName();
    LOG.info("[{}] is submitting to [{}], submission id [{}]", username, subkledditName, form.getSubmissionId());

    Optional<User> userOptional = userService.getUserByUsername(username);

    if (!userOptional.isPresent()) {
      LOG.info("[{}] does not exist, he cannot post.", username);
      throw new AuthUserDoesNotExistException("User [" + username + "] does not exist.");
    }

    User user = userOptional.get();
    boolean isSubscribed = subkledditSubscriptionService.isSubscribed(user.getUserId(), subkledditName);
    if (!isSubscribed) {
      throw new SubmissionException(username + " is not subscribed to " + subkledditName);
    }

    Optional<Subkleddit> subkledditOptional = subkledditService.getSubkledditByName(subkledditName);
    if (!subkledditOptional.isPresent()) {
      LOG.info("[{}] subkleddit does not exist, cannot post to it.", subkledditName);
      throw new SubkledditDoesNotExistException(subkledditName + " does not exist!");
    }

    Submission submission = new Submission();
    SubmissionId submissionId = null;
    try {
      submissionId = new SubmissionId(form.getSubmissionId());
    } catch (IllegalArgumentException e) {
      throw new SubmissionException("Invalid submission id [" + form.getSubmissionId() + "]");
    }

    Subkleddit subkleddit = subkledditOptional.get();
    submission.setSubmissionId(submissionId);

    Timestamp timestamp = Timestamp.from(Instant.ofEpochMilli(form.getSubmissionTime()));
    Timestamp now = Timestamp.from(Instant.now());
    if (timestamp.getTime() > now.getTime()) {
      LOG.info("Time of submission [{}] cannot be later than now [{}]", timestamp, now);
      throw new SubmissionException("Time of submission [" + timestamp + "] cannot be later than now [" + now + "]");
    }

    submission.setCreatedAt(timestamp);
    submission.setAuthorId(user.getUserId());
    submission.setContent(form.getContent());
    submission.setSubkleddit(subkleddit);
    List<Submission> submissions = subkleddit.getSubmissions();
    submissions.add(submission);
    subkledditService.updateSubkleddit(subkleddit);
  }

  @Override
  public List<Submission> getSubmissions(String subkledditName) {
    Objects.requireNonNull(subkledditName);
    LOG.info("Retrieving submissions for [{}]", subkledditName);
    Optional<Subkleddit> subkledditOptional = subkledditService.getSubkledditByName(subkledditName);

    if (!subkledditOptional.isPresent()) {
      LOG.info("[{}] subkleddit does not exist, cannot post to it.", subkledditName);
      throw new SubkledditDoesNotExistException(subkledditName + " does not exist!");
    }

    List<Submission> submissions = subkledditOptional.get().getSubmissions();
    LOG.info("Retrieved [{}] submissions for subkleddit [{}]", submissions.size(), subkledditName);

    return new ArrayList<>(submissions);
  }

}
