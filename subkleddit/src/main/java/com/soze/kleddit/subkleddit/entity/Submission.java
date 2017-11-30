package com.soze.kleddit.subkleddit.entity;

import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.user.entity.UserId;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Table(name = "submissions")
public class Submission {

  @EmbeddedId
  private SubmissionId submissionId;

  @Column(name = "created_at")
  private Timestamp createdAt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "author_id")
  private User author;

  @Column(name = "title")
  private String title;

  @Column(name = "content")
  private String content;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "subkleddit_id")
  private Subkleddit subkleddit;

  public Submission() {

  }

  public SubmissionId getSubmissionId() {
    return submissionId;
  }

  public void setSubmissionId(SubmissionId submissionId) {
    this.submissionId = submissionId;
  }

  public Timestamp getCreatedAt() {
    return createdAt;
  }

  public void setCreatedAt(Timestamp createdAt) {
    this.createdAt = createdAt;
  }

  public User getAuthor() {
    return author;
  }

  public void setAuthor(User author) {
    this.author = author;
  }

  public String getContent() {
    return content;
  }

  public void setContent(String content) {
    this.content = content;
  }

  public Subkleddit getSubkleddit() {
    return subkleddit;
  }

  public void setSubkleddit(Subkleddit subkleddit) {
    this.subkleddit = subkleddit;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }
}
