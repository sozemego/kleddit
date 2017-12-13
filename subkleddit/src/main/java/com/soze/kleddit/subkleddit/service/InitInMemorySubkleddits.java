package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.entity.Subkleddit;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.ejb.Startup;
import javax.inject.Inject;
import java.util.List;

/**
 * User for development to create default subkleddits.
 */
@Singleton
@Startup
public class InitInMemorySubkleddits {

  @Inject
  private SubkledditService service;

  @PostConstruct
  public void postConstruct() {
    List<Subkleddit> subkledditList = service.getAllSubkleddits();
    if(subkledditList.isEmpty()) {
      service.addSubkleddit("General");
      service.addSubkleddit("Casual");
      service.addSubkleddit("News");
      service.addSubkleddit("Porn");
      service.addSubkleddit("Pictures");
      service.addSubkleddit("Videos");
      service.addSubkleddit("Gifs");
    }
  }

}
