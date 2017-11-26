package com.soze.kleddit.user.exceptions.mappers;

import com.soze.kleddit.user.exceptions.AuthUserDoesNotExistException;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class UserDoesNotExistExceptionMapper implements ExceptionMapper<AuthUserDoesNotExistException> {

  @Override
  public Response toResponse(AuthUserDoesNotExistException exception) {
    return Response.status(Response.Status.UNAUTHORIZED).build();
  }
}
