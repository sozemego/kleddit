package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.interceptors.RateLimited;
import com.soze.kleddit.subkleddit.dto.SubkledditSimpleDto;
import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.service.SubkledditSubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@RequestMapping("/api/0.1/subkleddit/subscription")
@RateLimited
@Controller
public class SubkledditSubscriptionController {

  @Autowired
  private SubkledditSubscriptionService subkledditSubscriptionService;

  @PostMapping(path = "/subscribe", produces = "application/json")
  public ResponseEntity subscribe(@RequestBody SubscriptionForm subscriptionForm) {
    Objects.requireNonNull(subscriptionForm);

    String username = SecurityContextHolder.getContext().getAuthentication().getName();

    subkledditSubscriptionService.subscribe(username, subscriptionForm);

    return ResponseEntity.ok().build();
  }

  @GetMapping(path = "/subkleddit/subscriptions/{name}", produces = "text/plain")
  public ResponseEntity getSubscriptionCount(@PathVariable("name") String name) {
    Objects.requireNonNull(name);

    long subscriberCount = subkledditSubscriptionService.getSubkledditSubscriberCount(name);

    return ResponseEntity.ok(subscriberCount);
  }

  @GetMapping(path = "user/subkleddits/{username}", produces = "application/json")
  public ResponseEntity getSubscribedSubkleddits(@PathVariable("username") String username) {
    Objects.requireNonNull(username);

    List<Subkleddit> subkleddits = subkledditSubscriptionService.getSubscribedSubkleddits(username);

    List<SubkledditSimpleDto> dtos = subkleddits.stream().map(subkleddit -> {
      return new SubkledditSimpleDto(
        subkleddit.getName(),
        subkledditSubscriptionService.getSubkledditSubscriberCount(subkleddit.getName())
      );
    }).collect(Collectors.toList());

    return ResponseEntity.ok(dtos);
  }


}
