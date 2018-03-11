package com.soze.kleddit.utils;

import com.soze.kleddit.utils.http.ErrorResponse;
import com.soze.kleddit.utils.json.JsonUtils;
import org.springframework.http.ResponseEntity;

public class ExceptionUtils {

  /**
   * Converts a {@link ErrorResponse} from the application into a {@link ResponseEntity}.
   * @param errorResponse response to convert
   * @return JAX-RS response
   */
  public static ResponseEntity convertErrorResponse(ErrorResponse errorResponse) {
    return ResponseEntity.status(errorResponse.getStatusCode())
      .body(JsonUtils.objectToJson(errorResponse));
  }

}
