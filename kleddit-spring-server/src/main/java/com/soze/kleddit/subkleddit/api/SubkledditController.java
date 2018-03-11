package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.interceptors.RateLimited;
import com.soze.kleddit.subkleddit.dto.SubkledditSimpleDto;
import com.soze.kleddit.subkleddit.entity.Subkleddit;
import com.soze.kleddit.subkleddit.service.SubkledditService;
import com.soze.kleddit.subkleddit.service.SubkledditSubscriptionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

@RateLimited
@Controller
@RequestMapping("/api/0.1/subkleddit")
public class SubkledditController {

  @Autowired
  private SubkledditService subkledditService;

  @Autowired
  private SubkledditSubscriptionService subkledditSubscriptionService;

  @GetMapping(path = "/all", produces = "application/json")
  public ResponseEntity getAllSubkleddits() {
    List<Subkleddit> subkleddits = subkledditService.getAllSubkleddits();

    List<SubkledditSimpleDto> dtos = subkleddits
      .stream()
      .map((subkleddit) ->
        new SubkledditSimpleDto(
          subkleddit.getName(),
          subkledditSubscriptionService.getSubkledditSubscriberCount(subkleddit.getName())
        )
      ).collect(Collectors.toList());

    return ResponseEntity.ok(dtos);
  }

  @GetMapping(path = "/single/{name}", produces = "application/json")
  public ResponseEntity getSubkledditByName(@PathVariable("name") String name) {
    Objects.requireNonNull(name);

    Optional<Subkleddit> subkledditOptional = subkledditService.getSubkledditByName(name, false);

    if(!subkledditOptional.isPresent()) {
      return ResponseEntity.status(404).build();
    }

    Subkleddit subkleddit = subkledditOptional.get();
    SubkledditSimpleDto dto = new SubkledditSimpleDto(
      subkleddit.getName(),
      subkledditSubscriptionService.getSubkledditSubscriberCount(subkleddit.getName())
    );

    return ResponseEntity.ok(dto);
  }

  @GetMapping(path = "/search", produces = "application/json")
  public ResponseEntity searchForSubkledditEmptyString() {
    return searchForSubkleddit("");
  }

  @GetMapping(path = "/search/{searchString}", produces = "application/json")
  public ResponseEntity searchForSubkleddit(@PathVariable("searchString") String searchString) {
    Objects.requireNonNull(searchString);
    List<Subkleddit> subkleddits = subkledditService.searchForSubkledditByName(searchString);

    List<SubkledditSimpleDto> dtos = subkleddits
      .stream()
      .map((subkleddit) ->
        new SubkledditSimpleDto(
          subkleddit.getName(),
          subkledditSubscriptionService.getSubkledditSubscriberCount(subkleddit.getName())
        )
      ).collect(Collectors.toList());

    return ResponseEntity.ok(dtos);
  }

}
