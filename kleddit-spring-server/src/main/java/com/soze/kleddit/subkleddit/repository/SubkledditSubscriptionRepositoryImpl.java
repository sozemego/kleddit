package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.SubkledditSubscription;
import com.soze.kleddit.utils.jpa.EntityUUID;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
public class SubkledditSubscriptionRepositoryImpl implements SubkledditSubscriptionRepository {

  @PersistenceContext
  private EntityManager em;

  @Override
  public List<SubkledditSubscription> getSubscriptions(String subkledditName) {
    Query query = em.createQuery("SELECT s from SubkledditSubscription s WHERE UPPER(s.subkledditName) = :subkledditName");
    query.setParameter("subkledditName", subkledditName.toUpperCase());
    return query.getResultList();
  }

  @Override
  public boolean isSubscribed(EntityUUID userId, String subkledditName) {
    Query query= em.createQuery("SELECT s FROM SubkledditSubscription s WHERE s.userId = :userId AND UPPER(s.subkledditName) = :subkledditName");
    query.setParameter("userId", userId);
    query.setParameter("subkledditName", subkledditName.toUpperCase());

    try {
      return query.getSingleResult() != null;
    } catch (NoResultException e) {
      return false;
    }
  }

  @Override
  @Transactional
  public void addSubscription(SubkledditSubscription subscription) {
    Objects.requireNonNull(subscription);
    em.persist(subscription);
  }

  @Override
  @Transactional
  public void removeSubscription(SubkledditSubscription subscription) {
    Objects.requireNonNull(subscription);

    if (subscription.getId() != 0) {
      em.remove(subscription);
    }

    Query query= em.createQuery("SELECT s FROM SubkledditSubscription s WHERE s.userId = :userId AND UPPER(s.subkledditName) = :subkledditName");
    query.setParameter("userId", subscription.getUserId());
    query.setParameter("subkledditName", subscription.getSubkledditName().toUpperCase());

    try {
      SubkledditSubscription subscription1 = (SubkledditSubscription) query.getSingleResult();
      em.remove(subscription1);
    } catch (NoResultException e) {
      //TODO do something about this
      e.printStackTrace();
    }
  }

  @Override
  public List<String> getSubscribedSubkleddits(EntityUUID userId) {
    Query query = em.createQuery("SELECT s FROM SubkledditSubscription s WHERE s.userId = :userId");
    query.setParameter("userId", userId);

    List<SubkledditSubscription> subscriptions = query.getResultList();

    return subscriptions
      .stream()
      .map(SubkledditSubscription::getSubkledditName)
      .collect(Collectors.toList());
  }
}
