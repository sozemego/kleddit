package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.subkleddit.service.SubmissionService;
import com.soze.kleddit.user.api.Authenticated;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("submission")
public class SubmissionApi {

  @Inject
  private SubmissionService submissionService;

  @Path("/subkleddit/{subkledditName}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getSubmissions() {

    return Response.ok().build();
  }

  @Path("/submit/{subkledditName}")
  @POST
  @Authenticated
  @Produces(MediaType.APPLICATION_JSON)
  public Response postSubmission() {


    return Response.ok().build();
  }

}
