package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.repository.SubkledditSubscriptionRepository;

import javax.ejb.Stateless;
import javax.inject.Inject;

@Stateless
public class SubkledditSubscriberCountDb implements SubkledditSubscriberCount {

  @Inject
  private SubkledditSubscriptionRepository subkledditSubscriptionRepository;

  @Override
  public long getSubscriberCountBySubkledditName(String name) {
    //TODO make this not suck
    return subkledditSubscriptionRepository.getSubscriptions(name).size();
  }

  @Override
  public void incrementSubscriberCount(String name) {

  }

  @Override
  public void decrementSubscriberCount(String name) {

  }
}
