package com.soze.kleddit.utils.http;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.HashMap;
import java.util.Map;
import java.util.Objects;

public class ErrorResponse {

  private int statusCode;
  private String error;
  private Map<String, Object> data = new HashMap<>();

  public ErrorResponse(int statusCode, String error) {
    this.statusCode = statusCode;
    this.error = Objects.requireNonNull(error);
  }

  @JsonCreator
  public ErrorResponse(@JsonProperty("statusCode") int statusCode,
                       @JsonProperty("error") String error,
                       @JsonProperty("data") Map<String, Object> data) {
    this.statusCode = statusCode;
    this.error = Objects.requireNonNull(error);
    this.data = Objects.requireNonNull(data);
  }

  public int getStatusCode() {
    return statusCode;
  }

  public void setStatusCode(int statusCode) {
    this.statusCode = statusCode;
  }

  public String getError() {
    return error;
  }

  public void setError(String error) {
    this.error = error;
  }

  public Map<String, Object> getData() {
    return data;
  }

  public void setData(Map<String, Object> data) {
    this.data = data;
  }

  public void addData(String key, Object value) {
    this.data.put(key, value);
  }
}
