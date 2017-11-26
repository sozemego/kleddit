package com.soze.kleddit.user.exceptions.mappers;


import com.soze.kleddit.user.exceptions.UserRegistrationException;
import com.soze.kleddit.utils.http.ErrorResponse;
import com.soze.kleddit.utils.json.JsonUtils;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class UserRegistrationExceptionMapper implements ExceptionMapper<UserRegistrationException> {

  @Override
  public Response toResponse(UserRegistrationException exception) {
    final int statusCode = 400;
    ErrorResponse errorResponse = new ErrorResponse(statusCode, exception.getMessage());
    errorResponse.addData("field", exception.getField());

    return Response
      .status(statusCode)
      .entity(JsonUtils.objectToJson(errorResponse))
      .build();
  }
}
