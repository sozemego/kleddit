package com.soze.kleddit.user.repository;

import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.user.entity.UserId;
import com.soze.kleddit.user.exceptions.AuthUserDoesNotExistException;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Stateless
public class UserRepositoryImpl implements UserRepository {

  @PersistenceContext(name = "userPU")
  private EntityManager em;

  @Override
  public List<User> getAllUsers() {
    Query query = em.createQuery("SELECT u FROM User u");
    return query.getResultList();
  }

  @Override
  public Optional<User> getUserById(UserId userId) {
    Objects.requireNonNull(userId);

    Query query = em.createQuery("SELECT u FROM User u WHERE UPPER(u.userId) = :userId AND u.nuked = false");
    query.setParameter("userId", userId);

    try {
      return Optional.of((User) query.getSingleResult());
    } catch (NoResultException e) {
      return Optional.empty();
    }
  }

  @Override
  public Optional<User> getUserByUsername(String username) {
    Objects.requireNonNull(username);

    Query query = em.createQuery("SELECT u FROM User u WHERE UPPER(u.username) = :username AND u.nuked = false");
    query.setParameter("username", username.toUpperCase());

    try {
      return Optional.of((User) query.getSingleResult());
    } catch (NoResultException e) {
      return Optional.empty();
    }
  }

  @Override
  public boolean usernameExists(String username) {
    Objects.requireNonNull(username);

    Query query = em.createQuery("SELECT u FROM User u where UPPER(u.username) = :username");
    query.setParameter("username", username.toUpperCase());
    return !query.setMaxResults(1).getResultList().isEmpty();
  }

  @Override
  public void addUser(User user) {
    em.persist(user);
  }

  @Override
  public void updateUser(User user) {
    em.merge(user);
  }

  @Override
  public void deleteUser(String username) {
    User user = getUserByUsername(username).orElseThrow(() -> {
      //TODO move this to UserService
      return new AuthUserDoesNotExistException("Trying to delete non-existent user.");
    });

    user.setNuked(true);
    updateUser(user);
  }


}
