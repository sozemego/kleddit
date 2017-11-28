package com.soze.kleddit.subkleddit.exceptions.mappers;

import com.soze.kleddit.subkleddit.exceptions.SubmissionException;
import com.soze.kleddit.utils.exception.ExceptionUtils;
import com.soze.kleddit.utils.http.ErrorResponse;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class SubmissionExceptionMapper implements ExceptionMapper<SubmissionException> {

  @Override
  public Response toResponse(SubmissionException exception) {
    int statusCode = 400;
    ErrorResponse error = new ErrorResponse(statusCode, exception.getMessage());

    //TODO convert other exception mappers to this
    return ExceptionUtils.convertErrorResponse(error);
  }
}
