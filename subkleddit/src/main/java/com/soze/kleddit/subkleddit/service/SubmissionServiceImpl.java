package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.user.exceptions.AuthUserDoesNotExistException;
import com.soze.kleddit.user.service.UserService;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Stateless
public class SubmissionServiceImpl implements SubmissionService {

  @Inject
  private SubkledditService subkledditService;

  @Inject
  private UserService userService;

  @Override
  public void submit(String username, SubmissionForm form) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(form);

    Optional<User> userOptional = userService.getUserByUsername(username);

    if (!userOptional.isPresent()) {
      throw new AuthUserDoesNotExistException("User [" + username + "] does not exist.");
    }

    Optional<Subkleddit> subkledditOptional = subkledditService.getSubkledditByName(form.getSubkledditName());

  }

  @Override
  public List<Submission> getSubmissions(String subkledditName) {
    Objects.requireNonNull(subkledditName);

    Optional<Subkleddit> subkledditOptional = subkledditService.getSubkledditByName(subkledditName);

    return null;
  }

}
