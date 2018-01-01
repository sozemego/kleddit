package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionReplyForm;
import com.soze.kleddit.subkleddit.dto.SubmissionSimpleDto;
import com.soze.kleddit.subkleddit.test.SubkledditTest;
import com.soze.kleddit.utils.sql.DatabaseReset;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.assertResponseIsOk;
import static org.junit.Assert.assertEquals;

/**
 * Class testing interactions of submissions and replies.
 */
public class SubmissionReplySystemTest extends SubkledditTest {

  @Before
  public void setup() throws Exception {
    DatabaseReset.resetDatabase();
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

    post(form);
    post(form);
    post(form);
    assertEquals(3, getReplies(submissionId).size());

    Response response = deleteSubmission(submissionId);
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
    post(form);
    post(form);
    post(form);
    assertEquals(3, getReplies(submissionId).size());

    SubmissionSimpleDto submissionSimpleDto = getSubmissionById(submissionId);
    assertEquals(3, submissionSimpleDto.getReplyCount());
  }

}
