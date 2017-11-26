package com.soze.kleddit.subkleddit.repository;

import com.soze.kleddit.subkleddit.entity.Subkleddit;

import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Stateless
public class SubkledditRepositoryImpl implements SubkledditRepository {

  @PersistenceContext(name = "subkledditPU")
  private EntityManager em;

  @Override
  public List<Subkleddit> getAllSubkleddits() {
    Query query = em.createQuery("SELECT s FROM Subkleddit s");
    return query.getResultList();
  }

  @Override
  public void addSubkleddit(Subkleddit subkleddit) {
    Objects.requireNonNull(subkleddit);
    em.persist(subkleddit);
  }

  @Override
  public Optional<Subkleddit> getSubkledditByName(String name) {
    Query query = em.createQuery("SELECT s FROM Subkleddit s WHERE s.name = :name");
    query.setParameter("name", name);

    try {
      return Optional.of((Subkleddit) query.getSingleResult());
    } catch (NoResultException e) {
      return Optional.empty();
    }
  }

  @Override
  public List<Subkleddit> searchForSubkledditByName(String searchString) {
    Objects.requireNonNull(searchString);
    Query query = em.createQuery("SELECT s FROM Subkleddit s WHERE UPPER(s.name) LIKE :searchString");
    query.setParameter("searchString", searchString.toUpperCase());

    return query.getResultList();
  }
}
