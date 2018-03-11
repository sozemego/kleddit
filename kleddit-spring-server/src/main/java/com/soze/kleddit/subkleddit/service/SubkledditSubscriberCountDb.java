package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.repository.SubkledditSubscriptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service(value = "SubkledditSubscriberCountDb")
public class SubkledditSubscriberCountDb implements SubkledditSubscriberCount {

  @Autowired
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
