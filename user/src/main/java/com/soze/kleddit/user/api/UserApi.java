package com.soze.kleddit.user.api;

import com.soze.kleddit.user.dto.RegisterUserForm;
import com.soze.kleddit.user.dto.SimpleUserDto;
import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.user.service.UserService;
import com.soze.kleddit.utils.filters.Log;
import com.soze.kleddit.utils.http.ErrorResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.EJB;
import javax.ws.rs.*;
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
public class UserApi {

  private static final Logger LOG = LoggerFactory.getLogger(UserApi.class);

  @EJB
  private UserService userService;

  @GET
  @Path("/all")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getAllUsers() {
    List<User> users = userService.getAllUsers();

    List<SimpleUserDto> dtos = users.stream()
      .map(User::getUsername)
      .map(SimpleUserDto::new)
      .collect(Collectors.toList());

    return Response.ok(dtos).build();
  }

  @POST
  @Path("/register")
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response registerUser(RegisterUserForm registerUserForm) {
    userService.addUser(registerUserForm);

    return Response.ok(new SimpleUserDto(registerUserForm.getUsername())).build();
  }

  @GET
  @Path("/single/{username}")
  @Produces(MediaType.APPLICATION_JSON)
  public Response getUserByUsername(@PathParam("username") String username) {
    Objects.requireNonNull(username);

    Optional<User> userOptional = userService.getUserByUsername(username);

    if (!userOptional.isPresent()) {
      ErrorResponse errorResponse = new ErrorResponse(404, "User does not exist.");
      errorResponse.addData("username", username);
      return Response.status(404).entity(errorResponse).build();
    }

    return Response.ok(new SimpleUserDto(userOptional.get().getUsername())).build();
  }

  @Authenticated
  @DELETE
  @Path("/single/delete")
  public Response deleteUser(@Context SecurityContext context) {
    userService.deleteUser(context.getUserPrincipal().getName());
    return Response.ok().build();
  }

  @GET
  @Path("/single/available/{username}")
  public Response isUsernameAvailable(@PathParam("username") String username) {
    boolean isAvailable = userService.isAvailableForRegistration(username);
    return Response.ok(isAvailable).build();
  }


}
