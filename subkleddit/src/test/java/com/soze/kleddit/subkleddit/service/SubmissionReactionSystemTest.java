package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionReactionForm;
import com.soze.kleddit.subkleddit.dto.SubmissionSimpleDto;
import com.soze.kleddit.subkleddit.entity.SubmissionReaction;
import com.soze.kleddit.subkleddit.test.SubkledditTest;
import com.soze.kleddit.utils.jpa.EntityUUID;
import com.soze.kleddit.utils.sql.DatabaseReset;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.Map;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.*;
import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

public class SubmissionReactionSystemTest extends SubkledditTest {

  @Before
  public void setup() throws Exception {
    DatabaseReset.resetDatabase();
  }

  @Test
  public void testReactToNonExistentSubmission() {
    String username = "user";
    login(username);

    SubmissionReactionForm form = new SubmissionReactionForm(
      EntityUUID.randomId().toString(),
      SubmissionReaction.ReactionType.LIKE.toString()
    );

    Response response = post(form);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void testReactNotAuthorized() {
    SubmissionReactionForm form = new SubmissionReactionForm(
      EntityUUID.randomId().toString(),
      SubmissionReaction.ReactionType.LIKE.toString()
    );

    Response response = post(form);
    assertResponseIsUnauthorized(response);
  }

  @Test
  public void testReactValid() {
    String username = "user";
    login(username);
    subscribe("General");
    String submissionId = submitTo("General");

    SubmissionReactionForm form = new SubmissionReactionForm(
      submissionId,
      SubmissionReaction.ReactionType.LIKE.toString()
    );

    Response response = post(form);
    assertResponseIsCreated(response);
  }

  @Test
  public void testReactAlreadyReacted() {
    String username = "user";
    login(username);
    subscribe("General");
    String submissionId = submitTo("General");

    SubmissionReactionForm form = new SubmissionReactionForm(
      submissionId,
      SubmissionReaction.ReactionType.LIKE.toString()
    );

    Response response = post(form);
    assertResponseIsCreated(response);

    SubmissionSimpleDto dto = getSubmissionById(submissionId);
    Map<String, Integer> reactions = dto.getReactions();

    assertEquals(1, reactions.size());
    assertTrue(reactions.get(SubmissionReaction.ReactionType.LIKE.toString()) == 1);

    response = post(
      new SubmissionReactionForm(
        submissionId,
        SubmissionReaction.ReactionType.DISLIKE.toString()
      )
    );
    assertResponseIsCreated(response);

    dto = getSubmissionById(submissionId);
    reactions = dto.getReactions();

    assertEquals(1, reactions.size());
    assertTrue(reactions.getOrDefault(SubmissionReaction.ReactionType.LIKE.toString(), 0) == 0);
    assertTrue(reactions.get(SubmissionReaction.ReactionType.DISLIKE.toString()) == 1);
  }

}
