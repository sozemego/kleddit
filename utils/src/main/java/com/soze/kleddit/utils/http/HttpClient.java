package com.soze.kleddit.utils.http;

import com.soze.kleddit.utils.json.JsonUtils;

import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.Objects;

/**
 * A simple wrapper around a http client.
 * Used mostly for testing.
 * TODO extract an interface for the client, so that it can be mocked in places which need it
 */
public class HttpClient {

  private final String url;
  private String token = null;

  public HttpClient(String url) {
    this.url = Objects.requireNonNull(url);
  }

  public HttpClient(URI uri) {
    this.url = Objects.requireNonNull(uri.toString());
  }

  /**
   * Performs a GET request to the base url given to this object.
   */
  public Response get() {

    String finalPath = url;
    System.out.println("Making a get request to " + finalPath);

    return createClient()
      .target(url)
      .request()
      .header("Authorization", "Bearer " + token)
      .get();
  }

  /**
   * Performs a GET request to the base url with given path appended.
   * By default, it requests a application/json from the endpoint.
   */
  public Response get(String path) {
    Objects.requireNonNull(path);

    String finalPath = url + path;
    System.out.println("Making a GET request to " + finalPath);

    return createClient()
      .target(url + path)
      .request()
      .header("Authorization", "Bearer " + token)
      .accept(MediaType.APPLICATION_JSON)
      .get();
  }

  /**
   * Performs a GET request to the base url with given path appended.
   * By default, it requests a application/json from the endpoint.
   */
  public Response getPlainText(String path) {
    Objects.requireNonNull(path);

    String finalPath = url + path;
    System.out.println("Making a GET request to " + finalPath);

    return createClient()
      .target(url + path)
      .request()
      .header("Authorization", "Bearer " + token)
      .accept(MediaType.TEXT_PLAIN)
      .get();
  }

  /**
   * Stringifies a given body and performs a POST request to the base url.
   */
  public Response post(Object body) {
    Objects.requireNonNull(body);

    String finalPath = url;
    String json = JsonUtils.objectToJson(body);
    System.out.println("Making a POST request to " + finalPath + " with body " + json);

    return createClient()
      .target(url)
      .request()
      .header("Authorization", "Bearer " + token)
      .post(Entity.json(json));
  }

  /**
   * Stringifies a given body and performs a POST
   * request to the base url with path parameter appended.
   */
  public Response post(Object body, String path) {
    Objects.requireNonNull(body);
    Objects.requireNonNull(path);

    String finalPath = url + path;
    System.out.println("Making a POST request to " + finalPath);

    return createClient()
      .target(finalPath)
      .request()
      .header("Authorization", "Bearer " + token)
      .post(Entity.json(JsonUtils.objectToJson(body)));
  }

  public Response deleteWithAuthorizationHeader(String path, String headerValue) {

    String finalPath = url + path;
    System.out.println("Deleting with authorization header. Path: " + finalPath + ", header value: " + headerValue);


    return createClient()
      .target(finalPath)
      .request()
      .header("Authorization", "Bearer " + headerValue)
      .delete();
  }

  /**
   * Sends a DELETE request to the base path.
   */
  public Response delete() {

    System.out.println("Sending a DELETE request to " + url);

    return createClient()
      .target(url)
      .request()
      .header("Authorization", "Bearer " + token)
      .delete();
  }

  /**
   * Sends a DELETE request to the base path, with given path appended.
   * @param path
   * @return
   */
  public Response delete(String path) {
    Objects.requireNonNull(path);

    String finalPath = url + path;
    System.out.println("Sending a DELETE request to " + finalPath);

    return createClient()
      .target(finalPath)
      .request()
      .header("Authorization", "Bearer " + token)
      .delete();
  }

  public void setToken(String token) {
    this.token = token;
  }

  private Client createClient() {
    return ClientBuilder.newClient();
  }

}
