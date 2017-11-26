package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.dto.SubscriptionType;
import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.entity.SubkledditSubscription;
import com.soze.kleddit.subkleddit.exceptions.SubscriptionException;
import com.soze.kleddit.subkleddit.repository.SubkledditRepository;
import com.soze.kleddit.subkleddit.repository.SubkledditSubscriptionRepository;
import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.user.entity.UserId;
import com.soze.kleddit.user.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.EJB;
import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Stateless
public class SubkledditSubscriptionServiceImpl implements SubkledditSubscriptionService {

  private static final Logger LOG = LoggerFactory.getLogger(SubkledditSubscriptionServiceImpl.class);

  @EJB
  private SubkledditSubscriberCount subkledditSubscriberCount;

  @Inject
  private SubkledditSubscriptionRepository subkledditSubscriptionRepository;

  @Inject
  private SubkledditRepository subkledditRepository;

  @Inject
  private UserService userService;

  @Override
  public long getSubkledditSubscriberCount(String name) {
    Objects.requireNonNull(name);

    return subkledditSubscriberCount.getSubscriberCountBySubkledditName(name);
  }


  @Override
  public List<User> getSubscribedUsers(String name) {
    Objects.requireNonNull(name);

    List<SubkledditSubscription> subscriptions = subkledditSubscriptionRepository.getSubscriptions(name);

    return new ArrayList<>();
  }

  @Override
  public void subscribe(String username, SubscriptionForm form) {
    Objects.requireNonNull(username);
    Objects.requireNonNull(form);

    Optional<User> userOptional = userService.getUserByUsername(username);

    LOG.info("[{}] is trying to [{}] to [{}]", username, form.getSubscriptionType(), form.getSubkledditName());

    if (!userOptional.isPresent()) {
      throw new SubscriptionException("User with name [" + username + "] does not exist.");
    }

    String subkledditName = form.getSubkledditName();

    User user = userOptional.get();
    UserId userId = user.getUserId();

    SubkledditSubscription subscription = new SubkledditSubscription();
    subscription.setSubkledditName(subkledditName);
    subscription.setUserId(userId);

    if(form.getSubscriptionType() == SubscriptionType.SUBSCRIBE) {
      if(subkledditSubscriptionRepository.isSubscribed(userId, subkledditName)) {
        throw new SubscriptionException("User with name [" + user.getUsername() + "] already subscribed to [" + subkledditName + "]");
      }

      subkledditSubscriberCount.incrementSubscriberCount(subkledditName);
      subkledditSubscriptionRepository.addSubscription(subscription);
    }

    if(form.getSubscriptionType() == SubscriptionType.UNSUBSCRIBE) {
      if(!subkledditSubscriptionRepository.isSubscribed(userId, subkledditName)) {
        throw new SubscriptionException("User with name [" + user.getUsername() + "] was not subscribed to [" + subkledditName + "]");
      }

      subkledditSubscriberCount.decrementSubscriberCount(subkledditName);
      subkledditSubscriptionRepository.removeSubscription(subscription);
    }

  }

  @Override
  public List<Subkleddit> getSubscribedSubkleddits(String username) {
    Objects.requireNonNull(username);

    Optional<User> userOptional = userService.getUserByUsername(username);

    if(!userOptional.isPresent()) {
      throw new IllegalArgumentException("NOPE");
    }

    User user = userOptional.get();
    List<String> subkledditNames = subkledditSubscriptionRepository.getSubscribedSubkleddits(user.getUserId());

    return subkledditNames
      .stream()
      .map(subkledditRepository::getSubkledditByName)
      .filter(Optional::isPresent)
      .map(Optional::get)
      .collect(Collectors.toList());
  }

}
