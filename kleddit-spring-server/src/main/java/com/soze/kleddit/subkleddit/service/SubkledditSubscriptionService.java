package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.exceptions.SubscriptionException;
import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.utils.jpa.EntityUUID;

import java.util.List;

public interface SubkledditSubscriptionService {

  /**
   * Returns number of subscribers to a given subkleddit.
   * @param name subkleddit name
   * @return subscriber count, 0 if subkleddit with given name does not exist. Subkleddits with no subscribers also return 0
   */
  long getSubkledditSubscriberCount(String name);

  /**
   * Returns a list of users subscribing to a given subkleddit.
   * @param name subkleddit name
   * @return subscribing users
   */
  @Deprecated
  List<User> getSubscribedUsers(String name);

  /**
   * Attempts to subscribe/unsubscribe to/from a given subkleddit.
   * @param username user who wants to un/subscribe
   * @param form form
   * @throws SubscriptionException subkleddit does not exist,
   *                                or if user was already subscribed/not subscribed to this subkleddit
   */
  void subscribe(String username, SubscriptionForm form);

  List<Subkleddit> getSubscribedSubkleddits(String username);

  /**
   * Checks whether a given user is subscribed to subkleddit with given name.
   * @param userId userId
   * @param subkledditName subkledditName
   * @return true if user is subscribed, false if he is not or subkleddit does not exist
   */
  boolean isSubscribed(EntityUUID userId, String subkledditName);

}
