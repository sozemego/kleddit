package com.soze.kleddit.subkleddit.repository;


import com.soze.kleddit.subkleddit.entity.Subkleddit;

import java.util.List;
import java.util.Optional;

public interface SubkledditRepository {

  List<Subkleddit> getAllSubkleddits();

  void addSubkleddit(Subkleddit subkleddit);

  Optional<Subkleddit> getSubkledditByName(String name);

  List<Subkleddit> searchForSubkledditByName(String searchString);
}
