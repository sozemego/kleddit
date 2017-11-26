package com.soze.kleddit.subkleddit.dto;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Objects;

public class SubscriptionForm {

  private final String subkledditName;
  private final SubscriptionType subscriptionType;

  @JsonCreator
  public SubscriptionForm(@JsonProperty("subkledditName") String subkledditName,
                          @JsonProperty("subscriptionType") SubscriptionType subscriptionType) {
    this.subkledditName = Objects.requireNonNull(subkledditName);
    this.subscriptionType = Objects.requireNonNull(subscriptionType);
  }

  public String getSubkledditName() {
    return subkledditName;
  }

  public SubscriptionType getSubscriptionType() {
    return subscriptionType;
  }
}
