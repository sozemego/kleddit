package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.dto.SubmissionSimpleDto;
import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.dto.SubscriptionType;
import com.soze.kleddit.subkleddit.entity.SubmissionId;
import com.soze.kleddit.user.test.HttpClientTestAuthHelper;
import com.soze.kleddit.utils.http.HttpClient;
import com.soze.kleddit.utils.json.JsonUtils;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.time.OffsetDateTime;
import java.util.List;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.*;
import static org.junit.Assert.assertEquals;

public class SubmissionSystemTest {

  private final String getAllSubmissions = "submission/subkleddit/";
  private final String postSubmission = "submission/submit/";

  private final String subscribe = "subscription/subscribe/";

  private HttpClient client;
  private HttpClientTestAuthHelper authHelper;

  @Before
  public void setup() throws Exception {
    //TODO extract to files
    client = new HttpClient("http://localhost:8080/api/0.1/subkleddit/");
    authHelper = new HttpClientTestAuthHelper("http://localhost:8080/");
  }

  @Test
  public void testSubmissionSubscribed() {
    String username = "SUBMISSION_TEST";
    login(username);
    String subkledditName = "General";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(
      SubmissionId.randomId().toString(),
      OffsetDateTime.now().toEpochSecond(),
      subkledditName,
      "Content!"
    );
    Response response = client.post(form, postSubmission);
    assertResponseIsCreated(response);

    response = client.get(getAllSubmissions + subkledditName);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(1, submissions.size());
  }

  @Test
  public void testSubmissionUnsubscribed() {
    String username = "SUBMISSION_TEST_1";
    login(username);
    String subkledditName = "General";

    SubmissionForm form = new SubmissionForm(
      SubmissionId.randomId().toString(),
      OffsetDateTime.now().toEpochSecond(),
      subkledditName,
      "Content!"
    );
    Response response = client.post(form, postSubmission);
    assertResponseIsBadRequest(response);

    response = client.get(getAllSubmissions + subkledditName);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(0, submissions.size());
  }

  @Test
  public void testSubmissionUnauthorized() {
    String subkledditName = "Videos";
    SubmissionForm form = new SubmissionForm(
      SubmissionId.randomId().toString(),
      OffsetDateTime.now().toEpochSecond(),
      subkledditName,
      "Content!"
    );
    Response response = client.post(form, postSubmission);
    assertResponseIsUnauthorized(response);

    response = client.get(getAllSubmissions + subkledditName);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(0, submissions.size());
  }

  @Test
  public void testSubmissionSubkledditDoesNotExist() {
    String username = "SUBMISSION_TEST_2";
    login(username);
    String subkledditName = "SOMETHING_DOES_NOT_EXIST";

    SubmissionForm form = new SubmissionForm(
      SubmissionId.randomId().toString(),
      OffsetDateTime.now().toEpochSecond(),
      subkledditName,
      "Content!"
    );
    Response response = client.post(form, postSubmission);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void testSubmissionSubkledditNameCaseInsensitive() {
    String username = "SUBMISSION_TEST_3";
    login(username);
    String subkledditName = "pOrN";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(
      SubmissionId.randomId().toString(),
      OffsetDateTime.now().toEpochSecond(),
      subkledditName,
      "Content!"
    );
    Response response = client.post(form, postSubmission);
    assertResponseIsCreated(response);

    response = client.get(getAllSubmissions + subkledditName);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(1, submissions.size());
  }

  @Test
  public void testSubmissionInvalidSubmissionId() {
    String username = "SUBMISSION_TEST_4";
    login(username);
    String subkledditName = "Gifs";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(
      "not a valid id",
      OffsetDateTime.now().toEpochSecond(),
      subkledditName,
      "Content!"
    );

    Response response = client.post(form, postSubmission);
    assertResponseIsBadRequest(response);

    response = client.get(getAllSubmissions + subkledditName);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(0, submissions.size());
  }

  @Test
  public void testSubmissionInvalidTimestamp() {
    String username = "SUBMISSION_TEST_5";
    login(username);
    String subkledditName = "Gifs";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(
      SubmissionId.randomId().toString(),
      OffsetDateTime.now().toEpochSecond() + 25000000, //way after now
      subkledditName,
      "Content!"
    );

    Response response = client.post(form, postSubmission);
    assertResponseIsBadRequest(response);

    response = client.get(getAllSubmissions + subkledditName);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(0, submissions.size());
  }

  private List<SubmissionSimpleDto> getSubmissions(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubmissionSimpleDto.class);
  }

  private void login(String username) {
    authHelper.login(username);
    client.setToken(authHelper.getToken(username));
  }

}
