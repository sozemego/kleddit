package com.soze.kleddit.subkleddit.entity;

import com.soze.kleddit.user.entity.User;
import com.soze.kleddit.utils.jpa.EntityUUID;
import org.hibernate.annotations.Formula;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(name = "submissions")
public class Submission {

  @EmbeddedId
  @AttributeOverride(name = "id", column = @Column(name = "submission_id"))
  private EntityUUID submissionId;

  @Column(name = "created_at")
  private Timestamp createdAt;

  @ManyToOne(fetch = FetchType.EAGER)
  @JoinColumn(name = "author_id")
  private User author;

  @Column(name = "title")
  @Size(min = 1, max = 100)
  private String title;

  @Column(name = "content")
  @Size(min = 1, max = 10000)
  private String content;

  @ManyToOne(fetch = FetchType.EAGER)
  private Subkleddit subkleddit;

  @Formula("(SELECT COUNT(sr.reply_id) FROM submission_replies AS sr WHERE sr.submission_id = submission_id)")
  private int replyCount;

  @OneToMany(mappedBy = "submissionId", fetch = FetchType.EAGER)
  private List<SubmissionReaction> reactions = new ArrayList<>();

  public Submission() {

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

  public int getReplyCount() {
    return replyCount;
  }

  public void setReplyCount(final int replyCount) {
    this.replyCount = replyCount;
  }

  public List<SubmissionReaction> getReactions() {
    return reactions;
  }


  public void setReactions(final List<SubmissionReaction> reactions) {
    Objects.requireNonNull(reactions);
    this.reactions.clear();
    this.reactions.addAll(reactions);
  }

    @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;

    Submission that = (Submission) o;

    return getSubmissionId().equals(that.getSubmissionId());
  }

  @Override
  public int hashCode() {
    return getSubmissionId().hashCode();
  }
}
