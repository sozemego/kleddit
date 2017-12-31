package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.*;
import com.soze.kleddit.user.test.HttpClientTestAuthHelper;
import com.soze.kleddit.utils.http.HttpClient;
import com.soze.kleddit.utils.json.JsonUtils;
import com.soze.kleddit.utils.sql.DatabaseReset;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.List;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.assertResponseIsCreated;
import static com.soze.kleddit.utils.http.ResponseAssertUtils.assertResponseIsOk;
import static org.junit.Assert.assertEquals;

/**
 * Class testing interactions of submissions and replies.
 */
public class SubmissionReplySystemTest {

  private final String submissionReplies = "submission/reply/";
  private final String getAllSubmissions = "submission/subkleddit/";
  private final String postSubmission = "submission/submit/";
  private final String getSubmissionsForSubscribed = "submission/subscribed";
  private final String delete = "submission/delete/";
  private final String postReply = "submission/reply/";
  private final String getSubmission = "submission/single/";

  private final String subscribe = "subscription/subscribe/";

  private HttpClient client;
  private HttpClientTestAuthHelper authHelper;

  @Before
  public void setup() throws Exception {
    DatabaseReset.resetDatabase();
    //TODO extract to files
    client = new HttpClient("http://localhost:8180/api/0.1/subkleddit/");
    authHelper = new HttpClientTestAuthHelper("http://localhost:8180/");
  }

  @Test
  public void testDeleteSubmissionWithReplies() {
    String username = "SUBMISSION_TEST_10";
    login(username);
    String subkledditName = "Casual";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    client.post(form, postReply);
    client.post(form, postReply);
    client.post(form, postReply);
    assertEquals(3, getReplies(client.get(submissionReplies + submissionId)).size());

    Response response = client.delete(delete + submissionId);
    assertResponseIsOk(response);
  }

  @Test
  public void testSubmissionReplyCount() {
    String username = "SUBMISSION_TEST_10";
    login(username);
    String subkledditName = "Casual";
    subscribe(subkledditName);
    String submissionId = submitTo(subkledditName);

    SubmissionReplyForm form = new SubmissionReplyForm(
      submissionId,
      "Content"
    );
    client.post(form, postReply);
    client.post(form, postReply);
    client.post(form, postReply);
    assertEquals(3, getReplies(client.get(submissionReplies + submissionId)).size());

    SubmissionSimpleDto submissionSimpleDto = getSubmission(client.get(getSubmission + submissionId));
    assertEquals(3, submissionSimpleDto.getReplyCount());
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

  private List<SubmissionSimpleDto> getSubmissions(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubmissionSimpleDto.class);
  }

  private SubmissionSimpleDto getSubmission(Response response) {
    return JsonUtils.jsonToObject(response.readEntity(String.class), SubmissionSimpleDto.class);
  }

  private List<SubmissionReplyDto> getReplies(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubmissionReplyDto.class);
  }

  private void login(String username) {
    authHelper.login(username);
    client.setToken(authHelper.getToken(username));
  }

}
