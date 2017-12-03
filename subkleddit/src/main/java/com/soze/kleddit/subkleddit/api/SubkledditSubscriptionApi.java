package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.subkleddit.dto.SubkledditSimpleDto;
import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.service.SubkledditSubscriptionService;
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
@Path("/subscription")
public class SubkledditSubscriptionApi {

  @Context
  private SecurityContext securityContext;

  @Inject
  private SubkledditSubscriptionService subkledditSubscriptionService;

  @Authenticated
  @Path("/subscribe")
  @POST
  @Produces(MediaType.APPLICATION_JSON)
  public Response subscribe(SubscriptionForm subscriptionForm) {
    Objects.requireNonNull(subscriptionForm);

    String username = securityContext.getUserPrincipal().getName();

    subkledditSubscriptionService.subscribe(username, subscriptionForm);

    return Response.ok().build();
  }

  @GET
  @Path("subkleddit/subscriptions/{name}")
  @Produces(MediaType.TEXT_PLAIN)
  public Response getSubscriptionCount(@PathParam("name") String name) {
    Objects.requireNonNull(name);

    long subscriberCount = subkledditSubscriptionService.getSubkledditSubscriberCount(name);

    return Response.ok(subscriberCount).build();
  }

  @GET
  @Path("user/subkleddits/{username}")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getSubscribedSubkleddits(@PathParam("username") String username) {
    Objects.requireNonNull(username);

    List<Subkleddit> subkleddits = subkledditSubscriptionService.getSubscribedSubkleddits(username);

    List<SubkledditSimpleDto> dtos = subkleddits.stream().map(subkleddit -> {
      return new SubkledditSimpleDto(
        subkleddit.getName(),
        subkledditSubscriptionService.getSubkledditSubscriberCount(subkleddit.getName())
      );
    }).collect(Collectors.toList());

    return Response.ok(dtos).build();
  }


}
