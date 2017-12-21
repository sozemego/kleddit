package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.subkleddit.dto.SubmissionReplyForm;
import com.soze.kleddit.user.api.Authenticated;
import com.soze.kleddit.utils.filters.Log;

import javax.ws.rs.*;
import javax.ws.rs.core.Response;

@Log
@Path("/submission/reply")
public class SubmissionReplyApi {

  @Path("/")
  @GET
  public Response getSubmissions(@QueryParam("page") String page,
                                 @QueryParam("limit") String limit) {


    return Response.ok().build();
  }

  @Path("/")
  @POST
  @Authenticated
  public Response postSubmissionReply(SubmissionReplyForm form) {


    return Response.ok().build();
  }

  @Path("/{replyId}")
  @DELETE
  @Authenticated
  public Response deleteReply(@PathParam("replyId") String replyId) {

    return Response.ok().build();
  }

}
