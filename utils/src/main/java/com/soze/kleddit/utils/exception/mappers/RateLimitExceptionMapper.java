package com.soze.kleddit.utils.exception.mappers;

import com.soze.kleddit.utils.exception.ExceptionUtils;
import com.soze.kleddit.utils.exception.RateLimitException;
import com.soze.kleddit.utils.http.ErrorResponse;

import javax.ws.rs.core.Response;
import javax.ws.rs.ext.ExceptionMapper;
import javax.ws.rs.ext.Provider;
import java.util.HashMap;
import java.util.Map;

@Provider
public class RateLimitExceptionMapper implements ExceptionMapper<RateLimitException> {


  @Override
  public Response toResponse(final RateLimitException exception) {
    Map<String, Object> data = new HashMap<>();
    data.put("resource", exception.getLimitedResource());
    data.put("limit", exception.getRateLimit());
    data.put("next", exception.getNextRequest());
    ErrorResponse errorResponse = new ErrorResponse(429, "Rate limit exceeded", data);

    return ExceptionUtils.convertErrorResponse(errorResponse);
  }
}
