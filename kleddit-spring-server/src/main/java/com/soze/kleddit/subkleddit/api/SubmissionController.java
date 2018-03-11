package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.interceptors.RateLimited;
import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.dto.SubmissionReactionForm;
import com.soze.kleddit.subkleddit.dto.SubmissionSimpleDto;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.subkleddit.entity.SubmissionReaction;
import com.soze.kleddit.subkleddit.service.SubmissionService;
import com.soze.kleddit.user.service.UserService;
import com.soze.kleddit.utils.jpa.EntityUUID;
import com.soze.kleddit.utils.pagination.Pagination;
import com.soze.kleddit.utils.pagination.PaginationFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.*;
import java.util.stream.Collectors;

@RateLimited
@RequestMapping("/api/0.1/subkleddit/submission")
@Controller
public class SubmissionController {

  @Autowired
  private SubmissionService submissionService;

  @Autowired
  private UserService userService;

  @GetMapping(path = "/subkleddit/{subkledditName}", produces = "application/json")
  public ResponseEntity getSubmissions(@PathVariable("subkledditName") String subkledditName,
                                       @RequestParam("page") String page,
                                       @RequestParam("limit") String limit) {
    Objects.requireNonNull(subkledditName);

    Pagination pagination = PaginationFactory.createPagination(page, limit);
    List<Submission> submissions = submissionService.getSubmissions(subkledditName, pagination);

    List<SubmissionSimpleDto> dtos = submissions.stream()
      .map(this::convertSubmission)
      .collect(Collectors.toList());

    return ResponseEntity.ok(dtos);
  }

  @GetMapping(path = "/single/{submissionId}", produces = "application/json")
  public ResponseEntity getSubmissionById(@PathVariable("submissionId") EntityUUID submissionId) {
    Optional<Submission> submissionOptional = submissionService.getSubmissionById(submissionId);
    if (!submissionOptional.isPresent()) {
      return ResponseEntity.status(404).build();
    }

    SubmissionSimpleDto dto = convertSubmission(submissionOptional.get());
    return ResponseEntity.ok(dto);
  }

  @GetMapping(path = "/subscribed", produces = "application/json")
  public ResponseEntity getSubmissionsForSubscribedSubkleddits(@RequestParam("page") String page,
                                                               @RequestParam("limit") String limit) {
    String username = SecurityContextHolder.getContext().getAuthentication().getName();

    Pagination pagination = PaginationFactory.createPagination(page, limit);
    List<Submission> submissions = submissionService.getSubmissionsForUser(username, pagination);
    List<SubmissionSimpleDto> dtos = submissions.stream()
      .map(this::convertSubmission)
      .collect(Collectors.toList());

    return ResponseEntity.ok(dtos);
  }

  @PostMapping(path = "/submit", produces = "application/json")
  public ResponseEntity postSubmission(@RequestBody SubmissionForm form) {
    Objects.requireNonNull(form);

    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    Submission submission = submissionService.submit(username, form);

    return ResponseEntity
      .status(201)
      .body(convertSubmission(submission));
  }

  @DeleteMapping(path = "/delete/{submissionId}", produces = "application/json")
  public ResponseEntity deleteSubmission(@PathVariable("submissionId") EntityUUID submissionId) {
    Objects.requireNonNull(submissionId);
    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    submissionService.deleteSubmission(username, submissionId);

    return ResponseEntity.ok().build();
  }

  @RateLimited
  @PostMapping(path = "/react", produces = "application/json", consumes = "application/json")
  public ResponseEntity react(@RequestBody SubmissionReactionForm form) {

    String username = SecurityContextHolder.getContext().getAuthentication().getName();
    submissionService.react(username, form);

    return ResponseEntity.status(201).build();
  }

  private SubmissionSimpleDto convertSubmission(Submission submission) {
    Objects.requireNonNull(submission);

    final List<SubmissionReaction> reactions = submission.getReactions();
    final Map<String, Integer> reactionMap = new HashMap<>();

    String[] userReaction = new String[]{null}; //lambda final variable workaround
    Principal principal = SecurityContextHolder.getContext().getAuthentication();
    if (principal != null) {
      userService.getUserByUsername(principal.getName())
        .ifPresent(user -> {
          EntityUUID userId = user.getUserId();
          reactions.stream()
            .filter(reaction -> reaction.getUserId().equals(userId))
            .findFirst()
            .ifPresent(reaction -> userReaction[0] = reaction.getReactionType().toString());
        });
    }


    reactions.forEach(reaction -> reactionMap.compute(reaction.getReactionType().toString(), (k, v) -> {
      if (v == null) {
        return 1;
      }
      return ++v;
    }));

    return new SubmissionSimpleDto(
      submission.getSubmissionId().toString(),
      submission.getAuthor().getNuked() ? "[DELETED]" : submission.getAuthor().getUsername(),
      submission.getCreatedAt().getTime(),
      submission.getTitle(),
      submission.getContent(),
      submission.getSubkleddit().getName(),
      submission.getReplyCount(),
      reactionMap,
      userReaction[0]
    );
  }

}
