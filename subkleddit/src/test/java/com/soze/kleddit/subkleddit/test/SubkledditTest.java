package com.soze.kleddit.subkleddit.test;

import com.soze.kleddit.subkleddit.dto.*;
import com.soze.kleddit.user.dto.Jwt;
import com.soze.kleddit.user.dto.LoginForm;
import com.soze.kleddit.user.dto.RegisterUserForm;
import com.soze.kleddit.utils.CommonUtils;
import com.soze.kleddit.utils.http.HttpClient;
import com.soze.kleddit.utils.json.JsonUtils;

import javax.ws.rs.core.Response;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.assertResponseIsCreated;
import static com.soze.kleddit.utils.http.ResponseAssertUtils.assertResponseIsOk;

/**
 * Class used for testing various endpoints.
 * Since most endpoints require some pre-conditions
 * (e.g., POSTing a reply requires that a submission is present or user exists and is authenticated).
 *
 * This class is meant to be extended by test classes.
 *
 * This class provides default paths for API endpoints, but they can be overridden (via the parametrized constructor).
 */
public class SubkledditTest extends HttpClient {

  /**
   * Settable properties.
   */
  private static final String BASE = "BASE";
  private static final String PORT = "PORT";
  private static final String USER_BASE = "USER_BASE";
  private static final String SUBKLEDDIT_BASE = "SUBKLEDDIT_BASE";
  private static final String USER_API_VERSION = "USER_API_VERSION";
  private static final String SUBKLEDDIT_API_VERSION = "SUBKLEDDIT_API_VERSION";
  private static final String LOGIN = "LOGIN";
  private static final String REGISTER = "REGISTER";
  private static final String SUBKLEDDIT_SUBSCRIBE = "SUBKLEDDIT_SUBSCRIBE";
  private static final String SUBKLEDDIT_POST_SUBMISSION = "SUBKLEDDIT_POST_SUBMISSION";
  private static final String SUBMISSION_POST_REPLY = "SUBMISSION_POST_REPLY";
  private static final String SUBMISSION_DELETE_REPLY = "SUBMISSION_DELETE_REPLY";
  private static final String SUBMISSION_GET_REPLIES = "SUBMISSION_GET_REPLIES";

  private static final String DEFAULT_BASE = "http://localhost";
  private static final String DEFAULT_PORT = "8180";
  private static final String DEFAULT_USER_API_VERSION = "/api/0.1";
  private static final String DEFAULT_SUBKLEDDIT_API_VERSION = "/api/0.1";
  private static final String DEFAULT_USER_BASE = DEFAULT_USER_API_VERSION + "/user";
  private static final String DEFAULT_SUBKLEDDIT_BASE = DEFAULT_SUBKLEDDIT_API_VERSION + "/subkleddit";
  private static final String DEFAULT_LOGIN = DEFAULT_USER_BASE + "/auth/login";
  private static final String DEFAULT_REGISTER = DEFAULT_USER_BASE + "/register";
  private static final String DEFAULT_SUBKLEDDIT_SUBSCRIBE = DEFAULT_SUBKLEDDIT_BASE + "/subscription/subscribe";
  private static final String DEFAULT_SUBKLEDDIT_POST_SUBMISSION = DEFAULT_SUBKLEDDIT_BASE + "/submission/submit";

  private static final String DEFAULT_SUBMISSION_POST_REPLY = DEFAULT_SUBKLEDDIT_BASE + "/submission/reply";
  private static final String DEFAULT_SUBMISSION_DELETE_REPLY = DEFAULT_SUBKLEDDIT_BASE + "/submission/reply";
  private static final String DEFAULT_SUBMISSION_GET_REPLIES = DEFAULT_SUBKLEDDIT_BASE + "/submission/reply";

  private final Map<String, String> properties = getDefaultProperties();

  private final Map<String, String> userTokenMap = new HashMap<>();
  private final Map<String, String> userPasswordMap = new HashMap<>();

  public SubkledditTest() {
    this(new HashMap<>());
  }

  public SubkledditTest(Map<String, String> properties) {
    super(properties.getOrDefault(BASE, DEFAULT_BASE) + ":" + properties.getOrDefault(PORT, DEFAULT_PORT));
    Objects.requireNonNull(properties);
    properties.forEach(this.properties::put);
  }

  protected void login(String username) {
    register(username);

    userTokenMap.computeIfAbsent(username, (key) -> {
      LoginForm form = new LoginForm(username, userPasswordMap.get(username).toCharArray());
      Response response = post(form, getPath(LOGIN));
      Jwt token = JsonUtils.jsonToObject(response.readEntity(String.class), Jwt.class);
      return token.getJwt();
    });

    setToken(userTokenMap.get(username));
  }

  protected void register(String username) {

    userPasswordMap.computeIfAbsent(username, (key) -> {
      String randomPassword = CommonUtils.generateRandomString(15);
      RegisterUserForm form = new RegisterUserForm(username, randomPassword.toCharArray());

      post(form, getPath(REGISTER));
      return randomPassword;
    });

  }

  protected void subscribe(String subkledditName) {
    SubscriptionForm form = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    Response response = post(form, getPath(SUBKLEDDIT_SUBSCRIBE));
    assertResponseIsOk(response);
  }

  protected String submitTo(String subkledditName) {
    SubmissionForm form = new SubmissionForm(
      subkledditName,
      "Title",
      "Content!"
    );
    Response response = post(form, getPath(SUBKLEDDIT_POST_SUBMISSION));
    assertResponseIsCreated(response);
    SubmissionSimpleDto submissionDto = JsonUtils.jsonToObject(response.readEntity(String.class), SubmissionSimpleDto.class);
    return submissionDto.getSubmissionId();
  }

  protected Response post(SubmissionReplyForm form) {
    return post(form, getPath(SUBMISSION_POST_REPLY));
  }

  protected Response deleteReply(String replyId) {
    return delete(getPath(SUBMISSION_DELETE_REPLY) + "/" + replyId);
  }

  protected List<SubmissionReplyDto> getReplies(String submissionId) {
    return getReplies(get(getPath(SUBMISSION_GET_REPLIES) + "/" + submissionId));
  }

  private List<SubmissionReplyDto> getReplies(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubmissionReplyDto.class);
  }

  private String getPath(String name) {
    return properties.get(name);
  }

  private static Map<String, String> getDefaultProperties() {
    Map<String, String> properties = new HashMap<>();
    properties.put(BASE, DEFAULT_BASE);
    properties.put(PORT, DEFAULT_PORT);
    properties.put(USER_API_VERSION, DEFAULT_USER_API_VERSION);
    properties.put(SUBKLEDDIT_API_VERSION, DEFAULT_SUBKLEDDIT_API_VERSION);
    properties.put(USER_BASE, DEFAULT_USER_BASE);
    properties.put(LOGIN, DEFAULT_LOGIN);
    properties.put(REGISTER, DEFAULT_REGISTER);
    properties.put(SUBKLEDDIT_BASE, DEFAULT_SUBKLEDDIT_BASE);
    properties.put(SUBKLEDDIT_SUBSCRIBE, DEFAULT_SUBKLEDDIT_SUBSCRIBE);
    properties.put(SUBKLEDDIT_POST_SUBMISSION, DEFAULT_SUBKLEDDIT_POST_SUBMISSION);
    properties.put(SUBMISSION_POST_REPLY, DEFAULT_SUBMISSION_POST_REPLY);
    properties.put(SUBMISSION_DELETE_REPLY, DEFAULT_SUBMISSION_DELETE_REPLY);
    properties.put(SUBMISSION_GET_REPLIES, DEFAULT_SUBMISSION_GET_REPLIES);
    return properties;
  }

}
