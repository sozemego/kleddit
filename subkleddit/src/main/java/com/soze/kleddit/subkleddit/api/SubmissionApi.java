package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.dto.SubmissionReactionForm;
import com.soze.kleddit.subkleddit.dto.SubmissionSimpleDto;
import com.soze.kleddit.subkleddit.entity.Submission;
import com.soze.kleddit.subkleddit.entity.SubmissionReaction;
import com.soze.kleddit.subkleddit.service.SubmissionService;
import com.soze.kleddit.user.api.Authenticated;
import com.soze.kleddit.utils.api.pagination.Pagination;
import com.soze.kleddit.utils.api.pagination.PaginationFactory;
import com.soze.kleddit.utils.filters.Log;
import com.soze.kleddit.utils.filters.RateLimited;
import com.soze.kleddit.utils.jpa.EntityUUID;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.*;
import java.util.stream.Collectors;

@Path("submission")
@Log
@RateLimited
public class SubmissionApi {

  @Inject
  private SubmissionService submissionService;

  //TODO wrap in security container class?
  @Context
  private SecurityContext securityContext;

  @Path("/subkleddit/{subkledditName}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getSubmissions(@PathParam("subkledditName") String subkledditName,
                                 @QueryParam("page") String page,
                                 @QueryParam("limit") String limit) {
    Objects.requireNonNull(subkledditName);

    Pagination pagination = PaginationFactory.createPagination(page, limit);
    List<Submission> submissions = submissionService.getSubmissions(subkledditName, pagination);

    List<SubmissionSimpleDto> dtos = submissions.stream()
      .map(this::convertSubmission)
      .collect(Collectors.toList());

    return Response.ok(dtos).build();
  }

  @Path("/single/{submissionId}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getSubmissionById(@PathParam("submissionId") EntityUUID submissionId) {
    Optional<Submission> submissionOptional = submissionService.getSubmissionById(submissionId);
    if(!submissionOptional.isPresent()) {
      return Response.status(404).build();
    }

    SubmissionSimpleDto dto = convertSubmission(submissionOptional.get());
    return Response.ok(dto).build();
  }

  @Authenticated
  @Path("/subscribed")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getSubmissionsForSubscribedSubkleddits(@QueryParam("page") String page,
                                                         @QueryParam("limit") String limit) {
    String username = securityContext.getUserPrincipal().getName();

    Pagination pagination = PaginationFactory.createPagination(page, limit);
    List<Submission> submissions = submissionService.getSubmissionsForUser(username, pagination);
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
    Submission submission = submissionService.submit(username, form);

    return Response
      .status(201)
      .entity(convertSubmission(submission))
      .build();
  }

  @Path("/delete/{submissionId}")
  @DELETE
  @Authenticated
  @Produces(MediaType.APPLICATION_JSON)
  public Response deleteSubmission(@PathParam("submissionId") EntityUUID submissionId) {
    Objects.requireNonNull(submissionId);
    String username = securityContext.getUserPrincipal().getName();
    submissionService.deleteSubmission(username, submissionId);

    return Response.ok().build();
  }

  @Path("/react")
  @POST
  @Authenticated
  @RateLimited
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response react(SubmissionReactionForm form) {

    String username = securityContext.getUserPrincipal().getName();
    submissionService.react(username, form);

    return Response.status(201).build();
  }

  private SubmissionSimpleDto convertSubmission(Submission submission) {
    Objects.requireNonNull(submission);

    List<SubmissionReaction> reactions = submission.getReactions();

    Map<String, Integer> reactionMap = new HashMap<>();

    reactions.forEach(reaction -> reactionMap.compute(reaction.getReactionType().toString(), (k, v) -> {
      if(v == null) {
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
      reactionMap
    );
  }

}
