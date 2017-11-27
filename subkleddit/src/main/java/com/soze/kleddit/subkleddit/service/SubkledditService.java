package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.entity.Subkleddit;

import java.util.List;
import java.util.Optional;

public interface SubkledditService {

  List<Subkleddit> getAllSubkleddits();

  /**
   * Attempts to find a subkleddit by name.
   * @param name subkleddit name
   * @return Optional<Subkleddit>
   */
  Optional<Subkleddit> getSubkledditByName(String name);

  /**
   * Used for development to bootstrap the application
   * @param name subkleddit name
   */
  @Deprecated
  void addSubkleddit(String name);

  /**
   * Attempts to find subkleddits by name. This search is case-insensitive and trims white space.
   * @param searchString searchString
   * @return list of found subkleddits
   */
  public List<Subkleddit> searchForSubkledditByName(String searchString);

  void updateSubkleddit(Subkleddit subkleddit);

}
