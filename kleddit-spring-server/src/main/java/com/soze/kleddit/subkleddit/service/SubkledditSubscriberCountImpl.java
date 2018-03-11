package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.entity.SubkledditSubscription;
import com.soze.kleddit.subkleddit.repository.SubkledditRepository;
import com.soze.kleddit.subkleddit.repository.SubkledditSubscriptionRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * This class holds subscriber counts in memory to avoid fetching this
 * data from database.
 */
@Service
public class SubkledditSubscriberCountImpl implements SubkledditSubscriberCount {

  private static final Logger LOG = LoggerFactory.getLogger(SubkledditSubscriberCountImpl.class);

  @Autowired
  private SubkledditSubscriptionRepository subkledditSubscriptionRepository;

  @Autowired
  private SubkledditRepository subkledditRepository;

  private final Map<String, Long> counts = new ConcurrentHashMap<>();

  /**
   * This method counts all subscribers for all subkleddits and
   * keeps them in memory.
   */
  @PostConstruct
  public void postConstruct() {
    LOG.info("Initializing SubkledditSubscriberCountImpl.");
    List<Subkleddit> subkleddits = subkledditRepository.getAllSubkleddits();

    LOG.info("On startup, retrieved [{}] subkleddits for subscriber count.", subkleddits.size());

    subkleddits.forEach(subkleddit -> {
      List<SubkledditSubscription> subscriptions = subkledditSubscriptionRepository.getSubscriptions(subkleddit.getName());
      LOG.info("[{}] subkleddit has [{}] subscriptions", subkleddit.getName(), subscriptions.size());
      subscriptions.forEach((subscription) -> incrementSubscriberCount(subkleddit.getName()));
    });
  }

  @Override
  public long getSubscriberCountBySubkledditName(String name) {
    return counts.getOrDefault(name, 0L);
  }

  @Override
  public void incrementSubscriberCount(String name) {
    LOG.info("Incrementing subscriber count for [{}]", name);
    counts.compute(name, (k, v) ->  {
      if(v == null) {
        return 1L;
      }
      return v + 1L;
    });
  }

  @Override
  public void decrementSubscriberCount(String name) {
    LOG.info("Decrementing subscriber count for [{}]", name);
    counts.compute(name, (k, v) ->  {
      if(v == null || v == 0L) {
        return 0L;
      }
      return v - 1L;
    });
  }
}
