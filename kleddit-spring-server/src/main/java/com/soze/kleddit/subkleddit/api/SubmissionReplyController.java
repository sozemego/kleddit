package com.soze.kleddit.subkleddit.api;

import com.soze.kleddit.interceptors.RateLimited;
import com.soze.kleddit.subkleddit.dto.SubmissionReplyDto;
import com.soze.kleddit.subkleddit.dto.SubmissionReplyForm;
import com.soze.kleddit.subkleddit.entity.SubmissionReply;
import com.soze.kleddit.subkleddit.service.SubmissionReplyService;
import com.soze.kleddit.utils.jpa.EntityUUID;
import com.soze.kleddit.utils.pagination.PaginationFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/api/0.1/subkleddit/submission/reply")
@RateLimited
@Controller
public class SubmissionReplyController {

  @Autowired
  private SubmissionReplyService submissionReplyService;

  @GetMapping(path = "/{submissionId}", produces = "application/json")
  public ResponseEntity getReplies(@PathVariable("submissionId") EntityUUID submissionId,
                                   @RequestParam("page") String page,
                                   @RequestParam("limit") String limit) {

    List<SubmissionReply> replies = submissionReplyService.getReplies(
      submissionId,
      PaginationFactory.createPagination(page, limit)
    );

    List<SubmissionReplyDto> dtos = convertRepliesToDtos(replies);
    return ResponseEntity.ok(dtos);
  }

  @PostMapping(produces = "application/json", consumes = "application/json")
  public ResponseEntity postSubmissionReply(@RequestBody SubmissionReplyForm form) {
    SubmissionReply reply = submissionReplyService.postReply(SecurityContextHolder.getContext().getAuthentication().getName(), form);

    return ResponseEntity.status(HttpStatus.CREATED)
      .body(convertReplyToDto(reply));
  }

  @DeleteMapping(path = "/{replyId}", produces = "application/json")
  public ResponseEntity deleteReply(@PathVariable("replyId") EntityUUID replyId) {

    submissionReplyService.deleteReply(
      SecurityContextHolder.getContext().getAuthentication().getName(),
      replyId
    );

    return ResponseEntity.ok().build();
  }

  private SubmissionReplyDto convertReplyToDto(SubmissionReply reply) {
    return new SubmissionReplyDto(
      reply.getReplyId().toString(),
      reply.getSubmissionId().toString(),
      reply.getCreatedAt().getTime(),
      reply.getAuthor().getUsername(),
      reply.getContent()
    );
  }

  private List<SubmissionReplyDto> convertRepliesToDtos(List<SubmissionReply> replies) {
    return replies.stream().map(this::convertReplyToDto).collect(Collectors.toList());
  }

}
