package com.soze.kleddit.subkleddit.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class SubkledditSimpleDto {

  private final String name;
  private final long subscribers;

  @JsonCreator
  public SubkledditSimpleDto(@JsonProperty("name") String name,
                             @JsonProperty("subscribers") long subscribers
  ) {
    this.name = Objects.requireNonNull(name);
    this.subscribers = subscribers;
  }

  public String getName() {
    return name;
  }

  public long getSubscribers() {
    return subscribers;
  }

  @Override
  public String toString() {
    return "SubkledditSimpleDto{" +
      "name='" + name + '\'' +
      ", subscribers=" + subscribers +
      '}';
  }
}
