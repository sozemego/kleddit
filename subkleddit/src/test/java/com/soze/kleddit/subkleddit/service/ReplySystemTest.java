package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.*;
import com.soze.kleddit.user.test.HttpClientTestAuthHelper;
import com.soze.kleddit.utils.CommonUtils;
import com.soze.kleddit.utils.http.HttpClient;
import com.soze.kleddit.utils.jpa.EntityUUID;
import com.soze.kleddit.utils.json.JsonUtils;
import com.soze.kleddit.utils.sql.DatabaseReset;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.time.Instant;
import java.util.List;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.*;
import static org.junit.Assert.assertEquals;

public class ReplySystemTest {

  private final String submissionReplies = "submission/reply/";
  private final String postReply = "submission/reply/";
  private final String deleteReply = "submission/reply/";

  private final String postSubmission = "submission/submit/";
  private final String subscribe = "subscription/subscribe/";

  private HttpClient client;
  private HttpClientTestAuthHelper authHelper;

  @Before
  public void setup() throws Exception {
    DatabaseReset.resetDatabase();
    //TODO load paths from file
    client = new HttpClient("http://localhost:8180/api/0.1/subkleddit/");
    authHelper = new HttpClientTestAuthHelper("http://localhost:8180/");
  }

  @Test
  public void testPostReply() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );

    Response response = client.post(form, postReply);
    assertResponseIsCreated(response);

    List<SubmissionReplyDto> replies = getReplies(client.get(submissionReplies + submissionId));
    assertEquals(1, replies.size());
  }

  @Test
  public void testPostReplyInvalidSubmission() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      EntityUUID.randomId().toString(),
      Instant.now().toEpochMilli(),
      "Content"
    );

    Response response = client.post(form, postReply);
    assertResponseIsBadRequest(response);

    List<SubmissionReplyDto> replies = getReplies(client.get(submissionReplies + EntityUUID.randomId().toString()));
    assertEquals(0, replies.size());
  }

  @Test
  public void testPostReplyUnauthorized() throws Exception {
    SubmissionReplyForm form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      EntityUUID.randomId().toString(),
      Instant.now().toEpochMilli(),
      "Content"
    );

    assertResponseIsUnauthorized(client.post(form, postReply));
  }

  @Test
  public void testGetRepliesForSubmission() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );
    Response response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );
    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );
    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );

    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );

    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    List<SubmissionReplyDto> replies = getReplies(client.get(submissionReplies + submissionId));
    assertEquals(5, replies.size());
  }

  @Test
  public void testGetRepliesForInvalidSubmission() throws Exception {
    assertResponseIsBadRequest(client.get(submissionReplies + EntityUUID.randomId().toString()));
  }

  @Test
  public void testGetRepliesForSubmissionPaginated() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );
    Response response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );
    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );
    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );

    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );

    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    List<SubmissionReplyDto> replies = getReplies(client.get(submissionReplies + submissionId + "?page=1&limit3"));
    assertEquals(3, replies.size());
  }

  @Test
  public void testPostTooLongReplyContent() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
      submissionId,
      Instant.now().toEpochMilli(),
      CommonUtils.generateRandomString(15000)
    );

    Response response = client.post(form, postReply);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void deleteValidReply() throws Exception {
    login("USER");

    String subkledditName = "General";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    String replyId = EntityUUID.randomId().toString();
    SubmissionReplyForm form = new SubmissionReplyForm(
      replyId,
      submissionId,
      Instant.now().toEpochMilli(),
      "Content"
    );

    Response response = client.post(form, postReply);
    assertResponseIsCreated(response);

    List<SubmissionReplyDto> replies = getReplies(client.get(submissionReplies + submissionId));
    assertEquals(1, replies.size());

    client.delete(deleteReply + replyId);
    replies = getReplies(client.get(submissionReplies + submissionId));
    assertEquals(0, replies.size());
  }

  @Test
  public void deleteNonExistingReply() throws Exception {
    login("USER");

    String replyId = EntityUUID.randomId().toString();
    Response response = client.delete(deleteReply + replyId);
    assertResponseIsBadRequest(response);
  }

  private List<SubmissionReplyDto> getReplies(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubmissionReplyDto.class);
  }

  private void login(String username) {
    authHelper.login(username);
    client.setToken(authHelper.getToken(username));
  }

  private void subscribe(String subkledditName) {
    SubscriptionForm form = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    Response response = client.post(form, subscribe);
    assertResponseIsOk(response);
  }

  private String submitTo(String subkledditName) {
    String submissionId = EntityUUID.randomId().toString();
    SubmissionForm form = new SubmissionForm(
      submissionId,
      Instant.now().toEpochMilli(),
      subkledditName,
      "Title",
      "Content!"
    );
    Response response = client.post(form, postSubmission);
    assertResponseIsCreated(response);
    return submissionId;
  }

}
