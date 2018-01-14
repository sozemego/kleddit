package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.dto.SubmissionReactionForm;
import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.subkleddit.entity.SubmissionReaction;
import com.soze.kleddit.subkleddit.entity.SubmissionReply;
import com.soze.kleddit.subkleddit.exceptions.SubkledditDoesNotExistException;
import com.soze.kleddit.subkleddit.exceptions.SubmissionException;
import com.soze.kleddit.subkleddit.repository.SubmissionReactionRepository;
import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.user.exceptions.AuthUserDoesNotExistException;
import com.soze.kleddit.user.service.UserService;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.api.pagination.PaginationFactory;
import com.soze.kleddit.utils.jpa.EntityUUID;
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

  @Inject
  private SubmissionReplyService submissionReplyService;

  @Inject
  private SubmissionReactionRepository submissionReactionRepository;

  @Override
  public Submission submit(String username, SubmissionForm form) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(form);
    String subkledditName = form.getSubkledditName();
    LOG.info("[{}] is submitting to [{}]", username, subkledditName);

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

    if (form.getTitle().trim().isEmpty()) {
      LOG.info("User tried to post a submission without a title.");
      throw new SubmissionException("Title cannot be empty.");
    }

    if (form.getContent().trim().isEmpty()) {
      LOG.info("User tried to post a submission without content.");
      throw new SubmissionException("Content cannot be empty.");
    }

    if (form.getTitle().length() > MAX_TITLE_LENGTH) {
      LOG.info("User tried to post too long title.");
      throw new SubmissionException("User tried to post too long title. Maximum title length is: " + MAX_TITLE_LENGTH);
    }

    if (form.getContent().length() > MAX_CONTENT_LENGTH) {
      LOG.info("User tried to post too long content.");
      throw new SubmissionException("User tried to post too long content. Maximum content length is: " + MAX_CONTENT_LENGTH);
    }

    Submission submission = new Submission();

    Subkleddit subkleddit = subkledditOptional.get();
    submission.setSubmissionId(EntityUUID.randomId());

    submission.setCreatedAt(Timestamp.from(Instant.now()));
    submission.setAuthor(user);
    submission.setContent(form.getContent());
    submission.setSubkleddit(subkleddit);
    submission.setTitle(form.getTitle());
    submission.setReactions(new ArrayList<>());

    List<Submission> submissions = subkleddit.getSubmissions();
    submissions.add(submission);
    subkledditService.updateSubkleddit(subkleddit);

    return submission;
  }

  @Override
  public List<Submission> getSubmissions(String subkledditName) {
    Objects.requireNonNull(subkledditName);
    Pagination pagination = PaginationFactory.createPagination();
    return getSubmissions(subkledditName, pagination);
  }

  @Override
  public List<Submission> getSubmissions(String subkledditName, Pagination pagination) {
    Objects.requireNonNull(subkledditName);
    Objects.requireNonNull(pagination);

    LOG.info("Retrieving submissions for [{}] with pagination [{}]", subkledditName, pagination);
    Optional<Subkleddit> subkledditOptional = subkledditService.getSubkledditByName(subkledditName);

    if (!subkledditOptional.isPresent()) {
      LOG.info("[{}] subkleddit does not exist, cannot post to it.", subkledditName);
      throw new SubkledditDoesNotExistException(subkledditName + " does not exist!");
    }

    List<Submission> submissions = subkledditService.getSubmissionsForSubkleddit(subkledditName, pagination);
    LOG.info("Retrieved [{}] submissions for subkleddit [{}]", submissions.size(), subkledditName);

    return submissions;
  }

  @Override
  public List<Submission> getSubmissionsForUser(String username) {
    Objects.requireNonNull(username);
    return getSubmissionsForUser(username, PaginationFactory.createPagination());
  }

  @Override
  public List<Submission> getSubmissionsForUser(String username, Pagination pagination) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(pagination);

    Optional<User> userOptional = userService.getUserByUsername(username);
    if (!userOptional.isPresent()) {
      LOG.info("Non existing user wanted to get a list of submissions.");
      throw new AuthUserDoesNotExistException(username);
    }

    List<Subkleddit> subscriptions = subkledditSubscriptionService.getSubscribedSubkleddits(username);
    List<String> subkledditNames = subscriptions.stream().map(Subkleddit::getName).collect(Collectors.toList());
    return subkledditService.getSubmissionsForSubkleddits(subkledditNames, pagination);
  }

  @Override
  public void deleteSubmission(String username, EntityUUID submissionId) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(submissionId);

    Optional<Submission> optionalSubmission = getSubmissionById(submissionId);
    if (!optionalSubmission.isPresent()) {
      LOG.info("Tried to delete submission with id [{}], but it does not exist.", submissionId);
      throw new SubmissionException("Submission id does not exist.");
    }

    Submission submission = optionalSubmission.get();
    String authorName = submission.getAuthor().getUsername();
    if (!authorName.equalsIgnoreCase(username)) {
      LOG.info("User [{}]  is trying to delete user [{}]'s submission.", username, authorName);
      throw new SubmissionException("Submission id does not exist.");
    }

    List<SubmissionReply> replies = submissionReplyService.getReplies(submissionId, PaginationFactory.createPagination(1, Integer.MAX_VALUE));
    replies.forEach(reply -> submissionReplyService.deleteReply(reply.getReplyId()));

    Subkleddit subkleddit = submission.getSubkleddit();
    HashSet<Submission> submissions = new HashSet<>(subkleddit.getSubmissions());
    submissions.remove(submission);
    subkleddit.setSubmissions(new ArrayList<>(submissions));
    submission.setSubkleddit(null);
//    subkledditService.updateSubmission(submission);
    subkledditService.removeSubmission(submission);
    subkledditService.updateSubkleddit(subkleddit);
  }

  @Override
  public Optional<Submission> getSubmissionById(EntityUUID submissionId) {
    return subkledditService.getSubmissionById(submissionId);
  }

  @Override
  public void react(final String username, final SubmissionReactionForm form) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(form);

    SubmissionReaction.ReactionType reactionType = SubmissionReaction.ReactionType.valueOf(form.getReactionType().toUpperCase());

    //1. check if user exists
    Optional<User> optionalUser = userService.getUserByUsername(username);
    if (!optionalUser.isPresent()) {
      throw new AuthUserDoesNotExistException(username);
    }

    EntityUUID userId = optionalUser.get().getUserId();

    //2. check if submission exists
    Optional<Submission> optionalSubmission = getSubmissionById(EntityUUID.fromString(form.getSubmissionId()));
    if (!optionalSubmission.isPresent()) {
      throw new SubmissionException("Submission with id [" + form.getSubmissionId() + "] does not exist");
    }

    Submission submission = optionalSubmission.get();

    //3. get previous reaction from this user to this submission
    List<SubmissionReaction> reactions = submission.getReactions();

    reactions
      .stream()
      .filter(reaction -> {
        return reaction.getUserId().equals(userId);
      })
      .findFirst()
      .ifPresentOrElse(reaction -> {
        //if the reaction is the same, we delete the previous one and don't add another
        if(reaction.getReactionType() == reactionType) {
          reactions.remove(reaction);
          subkledditService.updateSubmission(submission);
          submissionReactionRepository.deleteReaction(reaction);
          return;
        }

        //update submission and reaction
        reaction.setReactionType(reactionType);
//        submission.setReactions(reactions);
        subkledditService.updateSubmission(submission);
        submissionReactionRepository.updateReaction(reaction);
      }, () -> {
        //5. create a reaction to this submission
        SubmissionReaction reaction = new SubmissionReaction();
        reaction.setSubmissionReactionId(EntityUUID.randomId());
        reaction.setSubmissionId(EntityUUID.fromString(form.getSubmissionId()));
        reaction.setReactionType(reactionType);
        reaction.setUserId(userId);

        submissionReactionRepository.addReaction(reaction);
      });

  }

}
