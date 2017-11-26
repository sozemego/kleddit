package com.soze.kleddit.subkleddit.exceptions.mappers;

import com.soze.kleddit.subkleddit.exceptions.IllegalSubkledditSearchException;
import com.soze.kleddit.utils.http.ErrorResponse;
import com.soze.kleddit.utils.json.JsonUtils;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class IllegalSubkledditSearchExceptionMapper implements ExceptionMapper<IllegalSubkledditSearchException> {

  @Override
  public Response toResponse(IllegalSubkledditSearchException exception) {
    ErrorResponse error = new ErrorResponse(400, exception.getMessage());

    return Response
      .status(400)
      .entity(Entity.json(JsonUtils.objectToJson(error)))
      .build();
  }
}
