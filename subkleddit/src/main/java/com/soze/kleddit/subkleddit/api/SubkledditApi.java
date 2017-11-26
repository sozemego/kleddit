package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.subkleddit.dto.SubkledditSimpleDto;
import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.service.SubkledditService;
import com.soze.kleddit.subkleddit.service.SubkledditSubscriptionService;
import com.soze.kleddit.utils.filters.Log;

import javax.inject.Inject;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Path("/")
@Log
public class SubkledditApi {

  @Inject
  private SubkledditService subkledditService;

  @Inject
  private SubkledditSubscriptionService subkledditSubscriptionService;

  @Context
  private SecurityContext securityContext;

  @Path("/all")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAllSubkleddits() {
    List<Subkleddit> subkleddits = subkledditService.getAllSubkleddits();

    List<SubkledditSimpleDto> dtos = subkleddits
      .stream()
      .map((subkleddit) ->
        new SubkledditSimpleDto(
          subkleddit.getName(),
          subkledditSubscriptionService.getSubkledditSubscriberCount(subkleddit.getName())
        )
      ).collect(Collectors.toList());

    return Response.ok(dtos).build();
  }

  @Path("/single/{name}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response getSubkledditByName(@PathParam("name") String name) {
    Objects.requireNonNull(name);

    Optional<Subkleddit> subkledditOptional = subkledditService.getSubkledditByName(name);

    if(!subkledditOptional.isPresent()) {
      return Response.status(404).build();
    }

    Subkleddit subkleddit = subkledditOptional.get();
    SubkledditSimpleDto dto = new SubkledditSimpleDto(
      subkleddit.getName(),
      subkledditSubscriptionService.getSubkledditSubscriberCount(subkleddit.getName())
    );

    return Response.ok(dto).build();
  }

  @Path("/search")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response searchForSubkledditEmptyString() {
    return searchForSubkleddit("");
  }

  @Path("/search/{searchString}")
  @GET
  @Produces(MediaType.APPLICATION_JSON)
  public Response searchForSubkleddit(@PathParam("searchString") String searchString) {
    Objects.requireNonNull(searchString);
    List<Subkleddit> subkleddits = subkledditService.searchForSubkledditByName(searchString);

    List<SubkledditSimpleDto> dtos = subkleddits
      .stream()
      .map((subkleddit) ->
        new SubkledditSimpleDto(
          subkleddit.getName(),
          subkledditSubscriptionService.getSubkledditSubscriberCount(subkleddit.getName())
        )
      ).collect(Collectors.toList());

    return Response.ok(dtos).build();
  }

}
