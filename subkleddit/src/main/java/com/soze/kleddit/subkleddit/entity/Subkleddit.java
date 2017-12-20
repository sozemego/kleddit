package com.soze.kleddit.subkleddit.entity;


import com.soze.kleddit.utils.jpa.EntityUUID;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Entity
@Table(
  name = "subkleddits",
  uniqueConstraints = @UniqueConstraint(columnNames = {"name"})
)
public class Subkleddit {

  @EmbeddedId
  @AttributeOverride(name = "id", column = @Column(name = "subkleddit_id"))
  private EntityUUID subkledditId;

  @Column(name = "name")
  private String name;

  @OneToMany(mappedBy = "subkleddit", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
  private List<Submission> submissions = new ArrayList<>();

  public Subkleddit() {

  }

  public EntityUUID getSubkledditId() {
    return subkledditId;
  }

  public void setSubkledditId(EntityUUID subkledditId) {
    this.subkledditId = subkledditId;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = Objects.requireNonNull(name);
  }

  public List<Submission> getSubmissions() {
    return submissions;
  }

  public void setSubmissions(List<Submission> submissions) {
    Objects.requireNonNull(submissions);
    this.submissions.clear();
    this.submissions.addAll(submissions);
  }
}
