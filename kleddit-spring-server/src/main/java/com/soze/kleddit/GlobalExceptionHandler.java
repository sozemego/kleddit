package com.soze.kleddit;


import com.soze.kleddit.interceptors.RateLimitException;
import com.soze.kleddit.subkleddit.exceptions.*;
import com.soze.kleddit.user.exception.InvalidPasswordException;
import com.soze.kleddit.user.exception.UserRegistrationException;
import com.soze.kleddit.utils.ExceptionUtils;
import com.soze.kleddit.utils.http.ErrorResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

  @ExceptionHandler(InvalidPasswordException.class)
  public ResponseEntity<Object> handleInvalidPasswordException(InvalidPasswordException exception) {
    return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
  }

  @ExceptionHandler(UserRegistrationException.class)
  public ResponseEntity<Object> handleUserRegistrationException(UserRegistrationException exception) {
    final int statusCode = 400;
    ErrorResponse errorResponse = new ErrorResponse(statusCode, exception.getMessage());
    errorResponse.addData("field", exception.getField());
    return ExceptionUtils.convertErrorResponse(errorResponse);
  }

  @ExceptionHandler(SubscriptionException.class)
  public ResponseEntity<Object> handleSubscriptionException(SubscriptionException exception) {
    ErrorResponse errorResponse = new ErrorResponse(400, exception.getMessage());
    return ExceptionUtils.convertErrorResponse(errorResponse);
  }

  @ExceptionHandler(SubmissionReplyException.class)
  public ResponseEntity<Object> handleSubmissionReplyException(SubmissionReplyException exception) {
    final int statusCode = 400;
    ErrorResponse error = new ErrorResponse(statusCode, exception.getMessage());
    return ExceptionUtils.convertErrorResponse(error);
  }

  @ExceptionHandler(SubmissionException.class)
  public ResponseEntity<Object> handleSubmissionException(SubmissionException exception) {
    int statusCode = 400;
    ErrorResponse error = new ErrorResponse(statusCode, exception.getMessage());
    return ExceptionUtils.convertErrorResponse(error);
  }

  @ExceptionHandler(SubkledditDoesNotExistException.class)
  public ResponseEntity<Object> handleSubkledditDoesNotExistException(SubkledditDoesNotExistException exception) {
    int statusCode = 400;
    ErrorResponse error = new ErrorResponse(statusCode, exception.getMessage());
    return ExceptionUtils.convertErrorResponse(error);
  }

  @ExceptionHandler(IllegalSubkledditSearchException.class)
  public ResponseEntity<Object> handleIllegalSubkledditSearchException(IllegalSubkledditSearchException exception) {
    ErrorResponse error = new ErrorResponse(400, exception.getMessage());
    return ExceptionUtils.convertErrorResponse(error);
  }

  @ExceptionHandler(RateLimitException.class)
  public ResponseEntity<Object> handleRateLimitException(RateLimitException exception) {
    Map<String, Object> data = new HashMap<>();
    data.put("resource", exception.getLimitedResource());
    data.put("limit", exception.getRateLimit());
    data.put("next", exception.getNextRequest());
    ErrorResponse errorResponse = new ErrorResponse(429, "Rate limit exceeded", data);

    return ExceptionUtils.convertErrorResponse(errorResponse);
  }

}
