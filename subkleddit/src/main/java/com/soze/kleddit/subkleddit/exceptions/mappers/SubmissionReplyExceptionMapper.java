package com.soze.kleddit.subkleddit.exceptions.mappers;

import com.soze.kleddit.subkleddit.exceptions.SubmissionReplyException;
import com.soze.kleddit.utils.exception.ExceptionUtils;
import com.soze.kleddit.utils.http.ErrorResponse;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;

@Provider
public class SubmissionReplyExceptionMapper implements ExceptionMapper<SubmissionReplyException> {

  @Override
  public Response toResponse(final SubmissionReplyException exception) {
    int statusCode = 400;
    ErrorResponse error = new ErrorResponse(statusCode, exception.getMessage());

    return ExceptionUtils.convertErrorResponse(error);
  }

}
