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
import java.util.*;
import java.util.stream.Collectors;

@Stateless
public class SubmissionServiceImpl implements SubmissionService {

  private static final Logger LOG = LoggerFactory.getLogger(SubmissionServiceImpl.class);
  private static final int MAX_TITLE_LENGTH = 100;
  private static final int MAX_CONTENT_LENGTH = 10000;

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

    if(form.getTitle().trim().isEmpty()) {
      LOG.info("User tried to post a submission without a title.");
      throw new SubmissionException("Title cannot be empty.");
    }

    if(form.getContent().trim().isEmpty()) {
      LOG.info("User tried to post a submission without content.");
      throw new SubmissionException("Content cannot be empty.");
    }

    if(form.getTitle().length() > MAX_TITLE_LENGTH) {
      LOG.info("User tried to post too long title.");
      throw new SubmissionException("User tried to post too long title. Maximum title length is: " + MAX_TITLE_LENGTH);
    }

    if(form.getContent().length() > MAX_CONTENT_LENGTH) {
      LOG.info("User tried to post too long content.");
      throw new SubmissionException("User tried to post too long content. Maximum content length is: " + MAX_CONTENT_LENGTH);
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
    submission.setAuthor(user);
    submission.setContent(form.getContent());
    submission.setSubkleddit(subkleddit);
    submission.setTitle(form.getTitle());

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

  @Override
  public List<Submission> getSubmissionsForUser(String username) {
    Objects.requireNonNull(username);

    Optional<User> userOptional = userService.getUserByUsername(username);
    if(!userOptional.isPresent()) {
      LOG.info("Non existing user wanted to get a list of submissions.");
      throw new AuthUserDoesNotExistException(username);
    }

    List<Subkleddit> subscriptions = subkledditSubscriptionService.getSubscribedSubkleddits(username);

    return subscriptions
      .stream()
      .flatMap(subkleddit -> subkleddit.getSubmissions().stream())
      .collect(Collectors.toList());
  }

  @Override
  public void deleteSubmission(String username, SubmissionId submissionId) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(submissionId);

    Optional<Submission> optionalSubmission = getSubmissionById(submissionId);
    if(!optionalSubmission.isPresent()) {
      LOG.info("Tried to delete submission with id [{}], but it does not exist.", submissionId);
      throw new IllegalArgumentException("Submission id does not exist.");
    }

    Submission submission = optionalSubmission.get();
    String authorName = submission.getAuthor().getUsername();
    if(!authorName.equalsIgnoreCase(username)) {
      LOG.info("User [{}]  is trying to delete user [{}]'s submission.", username, authorName);
      throw new IllegalArgumentException("Submission id does not exist.");
    }

    Subkleddit subkleddit = submission.getSubkleddit();
    HashSet<Submission> submissions = new HashSet<>(subkleddit.getSubmissions());
    submissions.remove(submission);
    subkleddit.setSubmissions(new ArrayList<>(submissions));
    submission.setSubkleddit(null);
    subkledditService.updateSubmission(submission);
    subkledditService.updateSubkleddit(subkleddit);
  }

  @Override
  public Optional<Submission> getSubmissionById(SubmissionId submissionId) {
    return subkledditService.getSubmissionById(submissionId);
  }

}
