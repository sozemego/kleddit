package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.*;
import com.soze.kleddit.subkleddit.test.SubkledditTest;
import com.soze.kleddit.utils.CommonUtils;
import com.soze.kleddit.utils.jpa.EntityUUID;
import com.soze.kleddit.utils.json.JsonUtils;
import com.soze.kleddit.utils.sql.DatabaseReset;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.List;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.*;
import static org.junit.Assert.assertEquals;

public class ReplySystemTest extends SubkledditTest {

  private final String base = "/subkleddit";
  private final String submissionReplies = base + "submission/reply/";

  @Before
  public void setup() throws Exception {
    DatabaseReset.resetDatabase();
  }

  @Test
  public void testPostReply() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );

    Response response = post(form);
    assertResponseIsCreated(response);

    List<SubmissionReplyDto> replies = getReplies(submissionId);
    assertEquals(1, replies.size());
  }

  @Test
  public void testPostReplyInvalidSubmission() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      "Content"
    );

    Response response = post(form);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void testPostReplyUnauthorized() throws Exception {
    SubmissionReplyForm form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      "Content"
    );

    assertResponseIsUnauthorized(post(form));
  }

  @Test
  public void testGetRepliesForSubmission() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    Response response = post(form);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    response = post(form);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    response = post(form);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );

    response = post(form);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );

    response = post(form);
    assertResponseIsCreated(response);

    List<SubmissionReplyDto> replies = getReplies(submissionId);
    assertEquals(5, replies.size());
  }

  @Test
  public void testGetRepliesForSubmissionPaginated() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    Response response = post(form);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    response = post(form);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    response = post(form);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );

    response = post(form);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );

    response = post(form);
    assertResponseIsCreated(response);

    List<SubmissionReplyDto> replies = getReplies(submissionId + "?page=1&limit=3");
    assertEquals(3, replies.size());
  }

  @Test
  public void testPostTooLongReplyContent() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      submissionId,
      CommonUtils.generateRandomString(15000)
    );

    Response response = post(form);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void deleteValidReply() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );

    Response response = post(form);
    assertResponseIsCreated(response);
    SubmissionReplyDto responseDto = getReply(response);

    List<SubmissionReplyDto> replies = getReplies(submissionId);
    assertEquals(1, replies.size());

    deleteReply(responseDto.getReplyId());
    replies = getReplies(submissionId);
    assertEquals(0, replies.size());
  }

  @Test
  public void deleteNonExistingReply() throws Exception {
    login("USER");

    String replyId = EntityUUID.randomId().toString();
    Response response = deleteReply(replyId);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void deleteOtherUsersReply() throws Exception {
    login("USER");
    String subkledditName = "General";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );

    Response response = post(form);
    assertResponseIsCreated(response);
    SubmissionReplyDto responseDto = getReply(response);

    login("Another_user");
    response = deleteReply(responseDto.getReplyId());
    assertResponseIsBadRequest(response);
  }

  private SubmissionReplyDto getReply(Response response) {
    return JsonUtils.jsonToObject(response.readEntity(String.class), SubmissionReplyDto.class);
  }

}
