package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.entity.SubkledditId;
import com.soze.kleddit.subkleddit.exceptions.IllegalSubkledditSearchException;
import com.soze.kleddit.subkleddit.repository.SubkledditRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ejb.Stateless;
import javax.inject.Inject;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Stateless
public class SubkledditServiceImpl implements SubkledditService {

  private static final Logger LOG = LoggerFactory.getLogger(SubkledditServiceImpl.class);
  private static final int MAX_SUBKLEDDIT_NAME_LENGTH = 100;

  @Inject
  private SubkledditRepository repository;

  @Override
  public List<Subkleddit> getAllSubkleddits() {
    return repository.getAllSubkleddits();
  }

  @Override
  public void addSubkleddit(String name) {
    Objects.requireNonNull(name);

    Subkleddit subkleddit = new Subkleddit();
    subkleddit.setSubkledditId(SubkledditId.randomId());
    subkleddit.setName(name);

    LOG.info("Adding subkleddit with name [{}]", name);

    repository.addSubkleddit(subkleddit);
  }

  @Override
  public List<Subkleddit> searchForSubkledditByName(String searchString) {
    Objects.requireNonNull(searchString);
    return repository.searchForSubkledditByName(searchString);
  }

  @Override
  public Optional<Subkleddit> getSubkledditByName(String name) {
    Objects.requireNonNull(name);

    if(name.length() > MAX_SUBKLEDDIT_NAME_LENGTH) {
      throw new IllegalSubkledditSearchException("Given subkleddit name was too long. Maximum character length is " + MAX_SUBKLEDDIT_NAME_LENGTH);
    }

    return repository.getSubkledditByName(name);
  }

}
