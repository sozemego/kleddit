package com.soze.kleddit.utils.json;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;
import java.util.List;
import java.util.Objects;

public class JsonUtils {

  private static final ObjectMapper MAPPER = new ObjectMapper();

  /**
   * Attempts to stringify a given object to json.
   * Returns empty string if conversion fails. This will probably be reworked.
   */
  public static String objectToJson(Object object) {
    Objects.requireNonNull(object);

    try {
      return MAPPER.writeValueAsString(object);
    } catch (JsonProcessingException e) {
      //TODO throw own exception
      throw new IllegalArgumentException(e);
    }
  }

  /**
   * Parses a given string and attempts to construct an object of given clazz.
   */
  public static <T> T jsonToObject(String json, Class<T> clazz) {
    System.out.println(Thread.currentThread().getName() + " " + json + " deserializing");
    Objects.requireNonNull(json);
    Objects.requireNonNull(clazz);
    try {
      return MAPPER.readValue(json, clazz);
    } catch (IOException e) {
      //TODO throw own exception
      throw new IllegalArgumentException(e);
    }
  }

  public static <T> List<T> jsonToList(String json, Class<T> clazz) {
    Objects.requireNonNull(json);
    Objects.requireNonNull(clazz);

    try {
      return MAPPER.readValue(json, MAPPER.getTypeFactory().constructCollectionType(List.class, clazz));
    } catch (IOException e) {
      //TODO throw own exception
      throw new IllegalArgumentException(e);
    }
  }

}
