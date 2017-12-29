package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionReplyForm;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.subkleddit.entity.SubmissionReply;
import com.soze.kleddit.subkleddit.exceptions.SubmissionException;
import com.soze.kleddit.subkleddit.exceptions.SubmissionReplyException;
import com.soze.kleddit.subkleddit.repository.SubmissionReplyRepository;
import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.user.exceptions.AuthUserDoesNotExistException;
import com.soze.kleddit.user.service.UserService;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.jpa.EntityUUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.sql.Timestamp;
import java.time.Instant;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Stateless
public class SubmissionReplyServiceImpl implements SubmissionReplyService {

  private static final Logger LOG  = LoggerFactory.getLogger(SubmissionReplyServiceImpl.class);
  private static final int MAX_REPLY_LENGTH = 10000;

  @Inject
  private SubmissionReplyRepository submissionReplyRepository;

  @Inject
  private UserService userService;

  @Inject
  private SubkledditService subkledditService;

  @Override
  public SubmissionReply postReply(String username, SubmissionReplyForm form) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(form);

    LOG.info("[{}] is trying to post a submission reply form [{}]", username, form);

    Optional<User> userOptional = userService.getUserByUsername(username);
    if(!userOptional.isPresent()) {
      LOG.info("[{}] tried to post a reply, but this user does not exist.");
      throw new AuthUserDoesNotExistException(username);
    }

    Optional<Submission> optionalSubmission = subkledditService.getSubmissionById(EntityUUID.fromString(form.getSubmissionId()));
    if(!optionalSubmission.isPresent()) {
      LOG.info("User: [{}] tried to post a reply to a non-existent submission: [{}]", username, form.getSubmissionId());
      throw new SubmissionException("SubmissionId: " + form.getSubmissionId() + " does not exist.");
    }

    if(form.getContent().length() > MAX_REPLY_LENGTH) {
      LOG.info("[{}] tried to post too long reply, it was [{}] characters.", username, form.getContent().length());
      throw new SubmissionReplyException("Maximum reply length is " + MAX_REPLY_LENGTH);
    }

    User user = userOptional.get();

    SubmissionReply reply = new SubmissionReply();
    reply.setReplyId(EntityUUID.randomId());
    reply.setSubmissionId(EntityUUID.fromString(form.getSubmissionId()));
    reply.setAuthor(user);
    reply.setCreatedAt(Timestamp.from(Instant.now()));
    reply.setContent(form.getContent());

    return submissionReplyRepository.postReply(reply);
  }

  @Override
  public void deleteReply(String username, EntityUUID replyId) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(replyId);

    Optional<SubmissionReply> submissionReplyOptional = submissionReplyRepository.getSubmissionReplyById(replyId);
    if(!submissionReplyOptional.isPresent()) {
      LOG.info("[{}] tried to delete reply with id [{}], but it does not exist.", username, replyId);
      throw new SubmissionReplyException("SubmissionReply with id " + replyId.toString() + " does not exist.");
    }

    Optional<User> userOptional = userService.getUserByUsername(username);
    if(!userOptional.isPresent()) {
      LOG.info("[{}] tried to delete a reply, but this user does not exist.", username);
      throw new SubmissionReplyException("User with name " + username + " does not exist.");
    }

    SubmissionReply submissionReply = submissionReplyOptional.get();
    User user = userOptional.get();

    if(!submissionReply.getAuthor().equals(user)) {
      LOG.info("[{}] tried to delete another users reply. Reply id to delete was [{}]", username, replyId);
      throw new SubmissionReplyException("ReplyId " + replyId + " does not belong to user " + username);
    }

    submissionReplyRepository.deleteReply(replyId);
  }

  @Override
  public void deleteReply(final EntityUUID replyId) {
    Objects.requireNonNull(replyId);

    Optional<SubmissionReply> submissionReplyOptional = submissionReplyRepository.getSubmissionReplyById(replyId);
    if(!submissionReplyOptional.isPresent()) {
      LOG.info("Tried to delete reply with id [{}], but it does not exist.", replyId);
      throw new SubmissionReplyException("SubmissionReply with id " + replyId.toString() + " does not exist.");
    }

    submissionReplyRepository.deleteReply(replyId);
  }

  @Override
  public List<SubmissionReply> getReplies(EntityUUID submissionId, Pagination pagination) {
    Objects.requireNonNull(submissionId);
    Objects.requireNonNull(pagination);

    if(!subkledditService.getSubmissionById(submissionId).isPresent()) {
      throw new SubmissionReplyException("SubmissionId: " + submissionId + " does not exist");
    }

    return submissionReplyRepository.getReplies(submissionId, pagination);
  }
}
