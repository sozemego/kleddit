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
      submissionId,
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
      "Content"
    );

    Response response = client.post(form, postReply);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void testPostReplyUnauthorized() throws Exception {
    SubmissionReplyForm form = new SubmissionReplyForm(
      EntityUUID.randomId().toString(),
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
      submissionId,
      "Content"
    );
    Response response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );

    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
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
      submissionId,
      "Content"
    );
    Response response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );

    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );

    response = client.post(form, postReply);
    assertResponseIsCreated(response);

    List<SubmissionReplyDto> replies = getReplies(client.get(submissionReplies + submissionId + "?page=1&limit=3"));
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

    Response response = client.post(form, postReply);
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

    Response response = client.post(form, postReply);
    assertResponseIsCreated(response);
    SubmissionReplyDto responseDto = getReply(response);

    List<SubmissionReplyDto> replies = getReplies(client.get(submissionReplies + submissionId));
    assertEquals(1, replies.size());

    client.delete(deleteReply + responseDto.getReplyId());
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

    Response response = client.post(form, postReply);
    assertResponseIsCreated(response);
    SubmissionReplyDto responseDto = getReply(response);

    login("Another_user");
    response = client.delete(deleteReply + responseDto.getReplyId());
    assertResponseIsBadRequest(response);
  }

  private List<SubmissionReplyDto> getReplies(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubmissionReplyDto.class);
  }

  private SubmissionReplyDto getReply(Response response) {
    return JsonUtils.jsonToObject(response.readEntity(String.class), SubmissionReplyDto.class);
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
    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      "Content!"
    );
    Response response = client.post(form, postSubmission);
    assertResponseIsCreated(response);
    SubmissionSimpleDto submissionDto = JsonUtils.jsonToObject(response.readEntity(String.class), SubmissionSimpleDto.class);
    return submissionDto.getSubmissionId();
  }

}
