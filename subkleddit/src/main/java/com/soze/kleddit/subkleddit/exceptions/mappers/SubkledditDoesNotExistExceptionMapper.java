package com.soze.kleddit.subkleddit.exceptions.mappers;

import com.soze.kleddit.subkleddit.exceptions.SubkledditDoesNotExistException;
import com.soze.kleddit.utils.http.ErrorResponse;
import com.soze.kleddit.utils.json.JsonUtils;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class SubkledditDoesNotExistExceptionMapper implements ExceptionMapper<SubkledditDoesNotExistException> {

  @Override
  public Response toResponse(SubkledditDoesNotExistException e) {
    ErrorResponse error = new ErrorResponse(400, e.getMessage());

    return Response.status(error.getStatusCode())
      .entity(Entity.json(JsonUtils.objectToJson(error)))
      .build();
  }
}
