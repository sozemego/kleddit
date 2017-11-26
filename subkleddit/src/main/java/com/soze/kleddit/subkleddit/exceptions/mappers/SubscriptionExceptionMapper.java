package com.soze.kleddit.subkleddit.exceptions.mappers;

import com.soze.kleddit.subkleddit.exceptions.SubscriptionException;
import com.soze.kleddit.utils.http.ErrorResponse;
import com.soze.kleddit.utils.json.JsonUtils;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class SubscriptionExceptionMapper implements ExceptionMapper<SubscriptionException> {

  @Override
  public Response toResponse(SubscriptionException exception) {
    ErrorResponse errorResponse = new ErrorResponse(400, exception.getMessage());

    return Response
      .status(errorResponse.getStatusCode())
      .entity(Entity.json(JsonUtils.objectToJson(errorResponse)))
      .build();
  }
}
