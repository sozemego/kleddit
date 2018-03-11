package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.dto.SubscriptionType;
import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.entity.SubkledditSubscription;
import com.soze.kleddit.subkleddit.exceptions.SubscriptionException;
import com.soze.kleddit.subkleddit.repository.SubkledditRepository;
import com.soze.kleddit.subkleddit.repository.SubkledditSubscriptionRepository;
import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.user.exception.AuthUserDoesNotExistException;
import com.soze.kleddit.user.service.UserService;
import com.soze.kleddit.utils.jpa.EntityUUID;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class SubkledditSubscriptionServiceImpl implements SubkledditSubscriptionService {

  private static final Logger LOG = LoggerFactory.getLogger(SubkledditSubscriptionServiceImpl.class);

  @Autowired
  @Qualifier("SubkledditSubscriberCountDb")
  private SubkledditSubscriberCount subkledditSubscriberCount;

  @Autowired
  private SubkledditSubscriptionRepository subkledditSubscriptionRepository;

  @Autowired
  private SubkledditRepository subkledditRepository;

  @Autowired
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

  /**
   * Tries to find a user with given name.
   * Throws SubscriptionException if user is not found.
   * @param username username
   * @return user
   * @throws SubscriptionException if user with given name is not found
   */
  private User getUserForSubscription(String username) {
    Objects.requireNonNull(username);

    Optional<User> userOptional = userService.getUserByUsername(username);
    if(!userOptional.isPresent()) {
      LOG.info("User with name [{}] does not exist.", username);
      throw new SubscriptionException("User with name [" + username + "] does not exist.");
    }

    return userOptional.get();
  }

  /**
   * Tries to find a user id for given username.
   * Throws SubscriptionException if user is not found.
   * @param username username
   * @return userId
   * @throws SubscriptionException if user with given name is not found
   */
  private EntityUUID getUserIdForSubscription(String username) {
    return getUserForSubscription(username).getUserId();
  }

  @Override
  public void subscribe(String username, SubscriptionForm form) {
    Objects.requireNonNull(form);

    LOG.info("[{}] is trying to [{}] to [{}]", username, form.getSubscriptionType(), form.getSubkledditName());
    EntityUUID userId = getUserIdForSubscription(username);

    String subkledditName = form.getSubkledditName();
    Optional<Subkleddit> subkleddit = subkledditRepository.getSubkledditByName(subkledditName, false);
    if (!subkleddit.isPresent()) {
      LOG.info("User [{}] tried to subscribe to a subkleddit which does not exist! [{}]", username, subkledditName);
      throw new SubscriptionException("User [" + username + "] tried to subscribe to a subkleddit which does not exist! [" + subkledditName + "]");
    }

    SubkledditSubscription subscription = new SubkledditSubscription();
    subscription.setSubkledditName(subkledditName.toLowerCase());
    subscription.setUserId(userId);

    if (form.getSubscriptionType() == SubscriptionType.SUBSCRIBE) {
      if (subkledditSubscriptionRepository.isSubscribed(userId, subkledditName)) {
        throw new SubscriptionException("User with name [" + username + "] already subscribed to [" + subkledditName + "]");
      }

      subkledditSubscriberCount.incrementSubscriberCount(subkledditName);
      subkledditSubscriptionRepository.addSubscription(subscription);
    }

    if (form.getSubscriptionType() == SubscriptionType.UNSUBSCRIBE) {
      if (!subkledditSubscriptionRepository.isSubscribed(userId, subkledditName)) {
        throw new SubscriptionException("User with name [" + username + "] was not subscribed to [" + subkledditName + "]");
      }

      subkledditSubscriberCount.decrementSubscriberCount(subkledditName);
      subkledditSubscriptionRepository.removeSubscription(subscription);
    }

  }

  @Override
  public List<Subkleddit> getSubscribedSubkleddits(String username) {
    Objects.requireNonNull(username);

    Optional<User> userOptional = userService.getUserByUsername(username);
    if (!userOptional.isPresent()) {
      throw new AuthUserDoesNotExistException(username + " does not exist.");
    }

    User user = userOptional.get();
    List<String> subkledditNames = subkledditSubscriptionRepository.getSubscribedSubkleddits(user.getUserId());

    return subkledditNames
      .stream()
      .map(name -> subkledditRepository.getSubkledditByName(name, false))
      .filter(Optional::isPresent)
      .map(Optional::get)
      .collect(Collectors.toList());
  }

  @Override
  public boolean isSubscribed(EntityUUID userId, String subkledditName) {
    Objects.requireNonNull(userId);
    Objects.requireNonNull(subkledditName);
    return subkledditSubscriptionRepository.isSubscribed(userId, subkledditName);
  }

}
