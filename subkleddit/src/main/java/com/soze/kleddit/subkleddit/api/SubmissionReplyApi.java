package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.subkleddit.dto.SubmissionReplyDto;
import com.soze.kleddit.subkleddit.dto.SubmissionReplyForm;
import com.soze.kleddit.subkleddit.entity.SubmissionReply;
import com.soze.kleddit.subkleddit.service.SubmissionReplyService;
import com.soze.kleddit.user.api.Authenticated;
import com.soze.kleddit.utils.api.pagination.PaginationFactory;
import com.soze.kleddit.utils.filters.Log;
import com.soze.kleddit.utils.jpa.EntityUUID;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.List;
import java.util.stream.Collectors;

@Path("/submission/reply")
@Log
public class SubmissionReplyApi {

  @Inject
  private SubmissionReplyService submissionReplyService;

  @Context
  private SecurityContext securityContext;

  @Path("/{submissionId}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getReplies(@PathParam("submissionId") EntityUUID submissionId,
                             @QueryParam("page") String page,
                             @QueryParam("limit") String limit) {

    List<SubmissionReply> replies = submissionReplyService.getReplies(
      submissionId,
      PaginationFactory.createPagination(page, limit)
    );

    List<SubmissionReplyDto> dtos = convertRepliesToDtos(replies);
    return Response.ok(dtos).build();
  }

  @Path("/")
  @POST
  @Authenticated
  @Produces(MediaType.APPLICATION_JSON)
  public Response postSubmissionReply(SubmissionReplyForm form) {
    SubmissionReply reply = submissionReplyService.postReply(securityContext.getUserPrincipal().getName(), form);

    return Response.status(Response.Status.CREATED)
      .entity(convertReplyToDto(reply))
      .build();
  }

  @Path("/{replyId}")
  @DELETE
  @Authenticated
  @Produces(MediaType.APPLICATION_JSON)
  public Response deleteReply(@PathParam("replyId") EntityUUID replyId) {

    submissionReplyService.deleteReply(
      securityContext.getUserPrincipal().getName(),
      replyId
    );

    return Response.ok().build();
  }

  private SubmissionReplyDto convertReplyToDto(SubmissionReply reply) {
    return new SubmissionReplyDto(
      reply.getReplyId().toString(),
      reply.getSubmissionId().toString(),
      reply.getCreatedAt().getTime(),
      reply.getAuthor().getUsername(),
      reply.getContent()
    );
  }

  private List<SubmissionReplyDto> convertRepliesToDtos(List<SubmissionReply> replies) {
    return replies.stream().map(this::convertReplyToDto).collect(Collectors.toList());
  }

}
