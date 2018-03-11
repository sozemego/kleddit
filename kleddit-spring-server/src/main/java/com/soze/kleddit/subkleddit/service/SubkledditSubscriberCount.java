package com.soze.kleddit.subkleddit.service;


public interface SubkledditSubscriberCount {

  /**
   * Returns a number of subscribers for a given subkleddit.
   * @param name subkleddit name
   * @return number of subscribers
   */
  long getSubscriberCountBySubkledditName(String name);

  /**
   * Increments a subscriber count for a given subkleddit.
   * @param name subkleddit name
   */
  void incrementSubscriberCount(String name);

  /**
   * Decrements a subscriber count for a given subkleddit.
   * @param name subkleddit name
   */
  void decrementSubscriberCount(String name);

}
