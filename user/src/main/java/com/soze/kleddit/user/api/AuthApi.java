package com.soze.kleddit.user.api;

import com.soze.kleddit.user.dto.ChangePasswordForm;
import com.soze.kleddit.user.dto.Jwt;
import com.soze.kleddit.user.dto.LoginForm;
import com.soze.kleddit.user.service.AuthService;
import com.soze.kleddit.utils.filters.Log;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;

@Path("/auth")
@Log
public class AuthApi {

  @Inject
  private AuthService authService;

  @Context
  private SecurityContext securityContext;

  @Path("/login")
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  @Produces(MediaType.APPLICATION_JSON)
  public Response login(LoginForm loginForm) {
    Jwt token = authService.login(loginForm);
    return Response.ok(token).build();
  }

  @Authenticated
  @Path("/password/change")
  @POST
  @Consumes(MediaType.APPLICATION_JSON)
  public Response passwordChange(ChangePasswordForm changePasswordForm) {
    authService.passwordChange(securityContext.getUserPrincipal().getName(), changePasswordForm);
    return Response.ok().build();
  }

  @Authenticated
  @Path("/logout")
  @POST
  public Response logout() {
    return Response.ok().build();
  }

}
