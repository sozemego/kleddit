package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.entity.Subkleddit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.List;

/**
 * User for development to create default subkleddits.
 */
@Service
public class InitInMemorySubkleddits {

  @Autowired
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
