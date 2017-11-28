package com.soze.kleddit.utils.exception;

import com.soze.kleddit.utils.http.ErrorResponse;
import com.soze.kleddit.utils.json.JsonUtils;

import javax.ws.rs.client.Entity;
import javax.ws.rs.core.Response;

public class ExceptionUtils {

  /**
   * Converts a {@link ErrorResponse} from the application into a {@link Response}.
   * @param errorResponse response to convert
   * @return JAX-RS response
   */
  public static Response convertErrorResponse(ErrorResponse errorResponse) {
    return Response.status(errorResponse.getStatusCode())
      .entity(Entity.json(JsonUtils.objectToJson(errorResponse)))
      .build();
  }

}
