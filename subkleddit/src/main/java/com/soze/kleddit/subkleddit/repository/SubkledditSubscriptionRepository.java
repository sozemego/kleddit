package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.SubkledditSubscription;
import com.soze.kleddit.user.entity.UserId;

import java.util.List;

public interface SubkledditSubscriptionRepository {

  List<SubkledditSubscription> getSubscriptions(String subkledditName);

  boolean isSubscribed(UserId userId, String subkledditName);

  void addSubscription(SubkledditSubscription subscription);

  /**
   * If subscription has no id, looks for one with same userId-subkleddit pair and removes it, if present.
   * Otherwise removes given subscription.
   * @param subscription
   */
  void removeSubscription(SubkledditSubscription subscription);

  List<String> getSubscribedSubkleddits(UserId userId);

}
