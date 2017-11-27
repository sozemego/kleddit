package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.dto.SubscriptionType;
import com.soze.kleddit.subkleddit.entity.SubmissionId;
import com.soze.kleddit.user.test.HttpClientTestAuthHelper;
import com.soze.kleddit.utils.http.HttpClient;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.time.OffsetDateTime;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.*;

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

    SubmissionForm form = new SubmissionForm(SubmissionId.randomId(), OffsetDateTime.now(), subkledditName, "Content!");
    Response response = client.post(form, postSubmission);
    assertResponseIsCreated(response);
  }

  @Test
  public void testSubmissionUnsubscribed() {
    String username = "SUBMISSION_TEST";
    login(username);
    String subkledditName = "General";

    SubmissionForm form = new SubmissionForm(SubmissionId.randomId(), OffsetDateTime.now(), subkledditName, "Content!");
    Response response = client.post(form, postSubmission);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void testSubmissionUnauthorized() {
    String subkledditName = "General";
    SubmissionForm form = new SubmissionForm(SubmissionId.randomId(), OffsetDateTime.now(), subkledditName, "Content!");
    Response response = client.post(form, postSubmission);
    assertResponseIsUnauthorized(response);
  }

  @Test
  public void testSubmissionSubkledditDoesNotExist() {
    String username = "SUBMISSION_TEST";
    login(username);
    String subkledditName = "SOMETHING_DOES_NOT_EXIST";

    SubmissionForm form = new SubmissionForm(SubmissionId.randomId(), OffsetDateTime.now(), subkledditName, "Content!");
    Response response = client.post(form, postSubmission);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void testSubmissionSubkledditNameCaseInsensitive() {
    String username = "SUBMISSION_TEST";
    login(username);
    String subkledditName = "pOrN";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    client.post(subscriptionForm, subscribe);

    SubmissionForm form = new SubmissionForm(SubmissionId.randomId(), OffsetDateTime.now(), subkledditName, "Content!");
    Response response = client.post(form, postSubmission);
    assertResponseIsCreated(response);
  }

  private void login(String username) {
    authHelper.login(username);
    client.setToken(authHelper.getToken(username));
  }

}
