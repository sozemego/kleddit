package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.dto.SubmissionSimpleDto;
import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.dto.SubscriptionType;
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

public class SubmissionSystemTest {

  private final String getAllSubmissions = "submission/subkleddit/";
  private final String postSubmission = "submission/submit/";
  private final String getSubmissionsForSubscribed = "submission/subscribed";
  private final String delete = "submission/delete/";

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
  public void testSubmissionSubscribed() {
    String username = "SUBMISSION_TEST";
    login(username);
    String subkledditName = "General";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
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
    String subkledditName = "Pictures";

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
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
      subkledditName,
      "Title",
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
      subkledditName,
      "Title",
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
      subkledditName,
      "Title",
      "Content!"
    );
    Response response = client.post(form, postSubmission);
    assertResponseIsCreated(response);

    response = client.get(getAllSubmissions + subkledditName);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(1, submissions.size());
  }

  @Test
  public void testSubmissionEmptyTitle() {
    String username = "SUBMISSION_TEST_6";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "",
      "Content!"
    );

    Response response = client.post(form, postSubmission);
    assertResponseIsBadRequest(response);

    response = client.get(getAllSubmissions + subkledditName);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(0, submissions.size());
  }

  @Test
  public void testSubmissionTooLongTitle() {
    String username = "SUBMISSION_TEST_7";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      CommonUtils.generateRandomString(500),
      "Content!"
    );

    Response response = client.post(form, postSubmission);
    assertResponseIsBadRequest(response);

    response = client.get(getAllSubmissions + subkledditName);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(0, submissions.size());
  }

  @Test
  public void testSubmissionEmptyContent() {
    String username = "SUBMISSION_TEST_8";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      ""
    );

    Response response = client.post(form, postSubmission);
    assertResponseIsBadRequest(response);

    response = client.get(getAllSubmissions + subkledditName);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(0, submissions.size());
  }

  @Test
  public void testSubmissionTooLongContent() {
    String username = "SUBMISSION_TEST_9";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      CommonUtils.generateRandomString(10005)
    );

    Response response = client.post(form, postSubmission);
    assertResponseIsBadRequest(response);

    response = client.get(getAllSubmissions + subkledditName);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(0, submissions.size());
  }

  @Test
  public void testGetSubmissionsForUser() {
    String username = "SUBMISSION_TEST_10";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      "Super content"
    );

    client.post(form, postSubmission);

    Response response = client.get(getSubmissionsForSubscribed);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);

    assertEquals(1, submissions.size());
    assertEquals(true, submissions.get(0).isOwn());
  }

  @Test
  public void testDeleteSubmission() {
    String username = "SUBMISSION_TEST_10";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      "Super content"
    );

    SubmissionSimpleDto responseSubmission = getSubmission(client.post(form, postSubmission));

    Response response = client.get(getSubmissionsForSubscribed);
    List<SubmissionSimpleDto> submissions = getSubmissions(response);
    assertEquals(1, submissions.size());

    client.delete(delete + responseSubmission.getSubmissionId());
    assertEquals(0, getSubmissions(client.get(getSubmissionsForSubscribed)).size());
  }

  @Test
  public void testDeleteNonExistentSubmission() {
    String username = "SUBMISSION_TEST_10";
    login(username);
    Response response = client.delete(delete + EntityUUID.randomId().toString());
    assertResponseIsBadRequest(response);
  }

  @Test
  public void testDeleteSubmissionUnauthorized() {
    Response response = client.delete(delete + EntityUUID.randomId().toString());
    assertResponseIsUnauthorized(response);
  }

  private List<SubmissionSimpleDto> getSubmissions(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubmissionSimpleDto.class);
  }

  private SubmissionSimpleDto getSubmission(Response response) {
    return JsonUtils.jsonToObject(response.readEntity(String.class), SubmissionSimpleDto.class);
  }

  private void login(String username) {
    authHelper.login(username);
    client.setToken(authHelper.getToken(username));
  }

}
