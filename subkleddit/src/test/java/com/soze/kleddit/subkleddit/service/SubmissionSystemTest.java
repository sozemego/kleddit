package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.dto.SubmissionSimpleDto;
import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.dto.SubscriptionType;
import com.soze.kleddit.subkleddit.test.SubkledditTest;
import com.soze.kleddit.utils.CommonUtils;
import com.soze.kleddit.utils.jpa.EntityUUID;
import com.soze.kleddit.utils.sql.DatabaseReset;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.List;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.*;
import static org.junit.Assert.assertEquals;

public class SubmissionSystemTest extends SubkledditTest {

  @Before
  public void setup() throws Exception {
    DatabaseReset.resetDatabase();
  }

  @Test
  public void testSubmissionSubscribed() {
    String username = "SUBMISSION_TEST";
    login(username);
    String subkledditName = "General";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    post(subscriptionForm);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      "Content!"
    );
    Response response = post(form);
    assertResponseIsCreated(response);

    List<SubmissionSimpleDto> submissions = getSubmissionsForSubkleddit(subkledditName);
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
    Response response = post(form);
    assertResponseIsBadRequest(response);

    List<SubmissionSimpleDto> submissions = getSubmissionsForSubkleddit(subkledditName);
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
    Response response = post(form);
    assertResponseIsUnauthorized(response);

    List<SubmissionSimpleDto> submissions = getSubmissionsForSubkleddit(subkledditName);
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
    Response response = post(form);
    assertResponseIsBadRequest(response);
  }

  @Test
  public void testSubmissionSubkledditNameCaseInsensitive() {
    String username = "SUBMISSION_TEST_3";
    login(username);
    String subkledditName = "pOrN";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    post(subscriptionForm);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      "Content!"
    );
    Response response = post(form);
    assertResponseIsCreated(response);

    List<SubmissionSimpleDto> submissions = getSubmissionsForSubkleddit(subkledditName);
    assertEquals(1, submissions.size());
  }

  @Test
  public void testSubmissionEmptyTitle() {
    String username = "SUBMISSION_TEST_6";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    post(subscriptionForm);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "",
      "Content!"
    );

    Response response = post(form);
    assertResponseIsBadRequest(response);

    List<SubmissionSimpleDto> submissions = getSubmissionsForSubkleddit(subkledditName);
    assertEquals(0, submissions.size());
  }

  @Test
  public void testSubmissionTooLongTitle() {
    String username = "SUBMISSION_TEST_7";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    post(subscriptionForm);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      CommonUtils.generateRandomString(500),
      "Content!"
    );

    Response response = post(form);
    assertResponseIsBadRequest(response);

    List<SubmissionSimpleDto> submissions = getSubmissionsForSubkleddit(subkledditName);
    assertEquals(0, submissions.size());
  }

  @Test
  public void testSubmissionEmptyContent() {
    String username = "SUBMISSION_TEST_8";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    post(subscriptionForm);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      ""
    );

    Response response = post(form);
    assertResponseIsBadRequest(response);

    List<SubmissionSimpleDto> submissions = getSubmissionsForSubkleddit(subkledditName);
    assertEquals(0, submissions.size());
  }

  @Test
  public void testSubmissionTooLongContent() {
    String username = "SUBMISSION_TEST_9";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    post(subscriptionForm);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      CommonUtils.generateRandomString(10005)
    );

    Response response = post(form);
    assertResponseIsBadRequest(response);

    List<SubmissionSimpleDto> submissions = getSubmissionsForSubkleddit(subkledditName);
    assertEquals(0, submissions.size());
  }

  @Test
  public void testGetSubmissionsForUser() {
    String username = "SUBMISSION_TEST_10";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    post(subscriptionForm);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      "Super content"
    );

    post(form);

    List<SubmissionSimpleDto> submissions = getSubmissionsForSubkleddit(subkledditName);
    assertEquals(1, submissions.size());
  }

  @Test
  public void testDeleteSubmission() {
    String username = "SUBMISSION_TEST_10";
    login(username);
    String subkledditName = "Casual";

    SubscriptionForm subscriptionForm = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    post(subscriptionForm);

    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      "Super content"
    );

    SubmissionSimpleDto responseSubmission = getSubmission(post(form));

    List<SubmissionSimpleDto> submissions = getSubmissionsForSubkleddit(subkledditName);
    assertEquals(1, submissions.size());

    deleteSubmission(responseSubmission.getSubmissionId());
    assertEquals(0, getSubmissionsForSubkleddit(subkledditName).size());
  }

  @Test
  public void testDeleteNonExistentSubmission() {
    String username = "SUBMISSION_TEST_10";
    login(username);
    Response response = deleteSubmission(EntityUUID.randomId().toString());
    assertResponseIsBadRequest(response);
  }

  @Test
  public void testDeleteSubmissionUnauthorized() {
    Response response = deleteSubmission(EntityUUID.randomId().toString());
    assertResponseIsUnauthorized(response);
  }

}
