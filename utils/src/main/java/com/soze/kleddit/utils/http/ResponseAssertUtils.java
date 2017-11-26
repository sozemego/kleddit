package com.soze.kleddit.utils.http;

import javax.ws.rs.core.Response;

import static org.junit.Assert.assertEquals;

public class ResponseAssertUtils {

  public static void assertResponseIsOk(Response response) {
    assertEquals(Response.Status.OK, response.getStatusInfo());
  }

  public static void assertResponseIsBadRequest(Response response) {
    assertEquals(Response.Status.BAD_REQUEST, response.getStatusInfo());
  }

  public static void assertResponseIsNotFound(Response response) {
    assertEquals(Response.Status.NOT_FOUND, response.getStatusInfo());
  }

  public static void assertResponseIsUnauthorized(Response response) {
    assertEquals(Response.Status.UNAUTHORIZED, response.getStatusInfo());
  }

}
