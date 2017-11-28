package com.soze.kleddit.utils.http;

import javax.ws.rs.core.Response;
import javax.ws.rs.core.Response.Status;

import static org.junit.Assert.assertEquals;

public class ResponseAssertUtils {

  public static void assertResponseIsOk(Response response) {
    System.out.println(response.readEntity(String.class));
    assertEquals(Status.OK, response.getStatusInfo());
  }

  public static void assertResponseIsBadRequest(Response response) {
    System.out.println(response.readEntity(String.class));
    assertEquals(Status.BAD_REQUEST, response.getStatusInfo());
  }

  public static void assertResponseIsNotFound(Response response) {
    System.out.println(response.readEntity(String.class));
    assertEquals(Status.NOT_FOUND, response.getStatusInfo());
  }

  public static void assertResponseIsUnauthorized(Response response) {
    System.out.println(response.readEntity(String.class));
    assertEquals(Status.UNAUTHORIZED, response.getStatusInfo());
  }

  public static void assertResponseIsCreated(Response response) {
    System.out.println(response.readEntity(String.class));
    assertEquals(Status.CREATED, response.getStatusInfo());
  }

}
