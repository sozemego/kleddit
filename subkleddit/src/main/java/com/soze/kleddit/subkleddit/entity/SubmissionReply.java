package com.soze.kleddit.subkleddit.entity;


import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.utils.jpa.EntityUUID;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "submission_replies")
public class SubmissionReply {

  @EmbeddedId
  @AttributeOverride(name = "id", column = @Column(name = "reply_id"))
  private EntityUUID replyId;

  @Column(name = "submission_id")
  @AttributeOverride(name = "id", column = @Column(name = "submission_id"))
  private EntityUUID submissionId;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "author_id")
  private User author;

  @Column(name = "created_at")
  private Timestamp createdAt;

  @Column(name = "content")
  private String content;

  @Column(name = "nuked")
  private boolean nuked;

  public SubmissionReply() {}

  public EntityUUID getReplyId() {
    return replyId;
  }

  public void setReplyId(EntityUUID replyId) {
    this.replyId = replyId;
  }

  public EntityUUID getSubmissionId() {
    return submissionId;
  }

  public void setSubmissionId(EntityUUID submissionId) {
    this.submissionId = submissionId;
  }

  public Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Timestamp createdAt) {
    this.createdAt = createdAt;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public User getAuthor() {
    return author;
  }

  public void setAuthor(User author) {
    this.author = author;
  }

  public boolean isNuked() {
    return nuked;
  }

  public void setNuked(boolean nuked) {
    this.nuked = nuked;
  }
}
