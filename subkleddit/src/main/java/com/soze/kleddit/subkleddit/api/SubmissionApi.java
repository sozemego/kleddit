package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.dto.SubmissionSimpleDto;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.subkleddit.service.SubmissionService;
import com.soze.kleddit.user.api.Authenticated;
import com.soze.kleddit.utils.filters.Log;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Log
@Path("submission")
public class SubmissionApi {

  @Inject
  private SubmissionService submissionService;

  //TODO wrap in security container class?
  @Context
  private SecurityContext securityContext;

  @Path("/subkleddit/{subkledditName}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getSubmissions(@PathParam("subkledditName") String subkledditName) {
    Objects.requireNonNull(subkledditName);

    List<Submission> submissions = submissionService.getSubmissions(subkledditName);

    List<SubmissionSimpleDto> dtos = submissions.stream()
      .map(this::convertSubmission)
      .collect(Collectors.toList());

    return Response.ok(dtos).build();
  }

  @Authenticated
  @Path("/subscribed")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getSubmissionsForSubscribedSubkleddits() {
    String username = securityContext.getUserPrincipal().getName();

    List<Submission> submissions = submissionService.getSubmissionsForUser(username);
    List<SubmissionSimpleDto> dtos = submissions.stream()
      .map(this::convertSubmission)
      .collect(Collectors.toList());

    return Response.ok(dtos).build();
  }

  @Path("/submit")
  @POST
  @Authenticated
  @Produces(MediaType.APPLICATION_JSON)
  public Response postSubmission(SubmissionForm form) {
    Objects.requireNonNull(form);

    String username = securityContext.getUserPrincipal().getName();
    submissionService.submit(username, form);

    return Response.status(201).build();
  }

  private SubmissionSimpleDto convertSubmission(Submission submission) {
    Objects.requireNonNull(submission);
    return new SubmissionSimpleDto(
      submission.getSubmissionId().toString(),
      submission.getAuthor().getNuked() ? "[DELETED]" : submission.getAuthor().getUsername(),
      submission.getCreatedAt().getTime(),
      submission.getTitle(),
      submission.getContent(),
      submission.getSubkleddit().getName()
    );
  }

}
