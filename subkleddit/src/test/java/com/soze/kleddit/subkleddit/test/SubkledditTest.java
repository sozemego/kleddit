package com.soze.kleddit.subkleddit.test;

import com.soze.kleddit.subkleddit.dto.*;
import com.soze.kleddit.subkleddit.entity.SubmissionType;
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
  private static final String SUBKLEDDIT_GET_ALL = "SUBKLEDDIT_GET_ALL";
  private static final String SUBKLEDDIT_GET_SINGLE = "SUBKLEDDIT_GET_SINGLE";
  private static final String SUBKLEDDIT_SEARCH_BY_NAME = "SUBKLEDDIT_SEARCH_BY_NAME";
  private static final String SUBKLEDDIT_SUBSCRIBE = "SUBKLEDDIT_SUBSCRIBE";
  private static final String SUBKLEDDIT_POST_SUBMISSION = "SUBKLEDDIT_POST_SUBMISSION";
  private static final String SUBKLEDDIT_GET_SUBSCRIBED = "SUBKLEDDIT_GET_SUBSCRIBED";
  private static final String SUBKLEDDIT_SUBSCRIBER_COUNT = "SUBKLEDDIT_SUBSCRIBER_COUNT";
  private static final String SUBMISSION_GET_SINGLE = "SUBMISSION_GET_SINGLE";
  private static final String SUBMISSION_POST_REPLY = "SUBMISSION_POST_REPLY";
  private static final String SUBMISSION_DELETE_REPLY = "SUBMISSION_DELETE_REPLY";
  private static final String SUBMISSION_DELETE = "SUBMISSION_DELETE";
  private static final String SUBMISSION_GET_REPLIES = "SUBMISSION_GET_REPLIES";
  private static final String SUBMISSION_GET_BY_SUBKLEDDIT = "SUBMISSION_GET_BY_SUBKLEDDIT";


  /**
   * Default values for properties.
   */
  private static final String DEFAULT_BASE = "http://localhost";
  private static final String DEFAULT_PORT = "8180";
  private static final String DEFAULT_USER_API_VERSION = "/api/0.1";
  private static final String DEFAULT_SUBKLEDDIT_API_VERSION = "/api/0.1";
  private static final String DEFAULT_USER_BASE = DEFAULT_USER_API_VERSION + "/user";
  private static final String DEFAULT_SUBKLEDDIT_BASE = DEFAULT_SUBKLEDDIT_API_VERSION + "/subkleddit";
  private static final String DEFAULT_LOGIN = DEFAULT_USER_BASE + "/auth/login";
  private static final String DEFAULT_REGISTER = DEFAULT_USER_BASE + "/register";
  private static final String DEFAULT_SUBKLEDDIT_GET_ALL = DEFAULT_SUBKLEDDIT_BASE + "/all";
  private static final String DEFAULT_SUBKLEDDIT_GET_SINGLE = DEFAULT_SUBKLEDDIT_BASE + "/single";
  private static final String DEFAULT_SUBKLEDDIT_SEARCH_BY_NAME = DEFAULT_SUBKLEDDIT_BASE + "/search";
  private static final String DEFAULT_SUBKLEDDIT_SUBSCRIBE = DEFAULT_SUBKLEDDIT_BASE + "/subscription/subscribe";
  private static final String DEFAULT_SUBKLEDDIT_POST_SUBMISSION = DEFAULT_SUBKLEDDIT_BASE + "/submission/submit";
  private static final String DEFAULT_SUBKLEDDIT_GET_SUBSCRIBED = DEFAULT_SUBKLEDDIT_BASE + "/subscription/user/subkleddits";
  private static final String DEFAULT_SUBKLEDDIT_SUBSCRIBER_COUNT = DEFAULT_SUBKLEDDIT_BASE + "/subscription/subkleddit/subscriptions";

  private static final String DEFAULT_SUBMISSION_GET_SINGLE = DEFAULT_SUBKLEDDIT_BASE + "/submission/single";
  private static final String DEFAULT_SUBMISSION_POST_REPLY = DEFAULT_SUBKLEDDIT_BASE + "/submission/reply";
  private static final String DEFAULT_SUBMISSION_DELETE_REPLY = DEFAULT_SUBKLEDDIT_BASE + "/submission/reply";
  private static final String DEFAULT_SUBMISSION_DELETE = DEFAULT_SUBKLEDDIT_BASE + "/submission/delete";
  private static final String DEFAULT_SUBMISSION_GET_REPLIES = DEFAULT_SUBKLEDDIT_BASE + "/submission/reply";
  private static final String DEFAULT_SUBMISSION_GET_BY_SUBKLEDDIT = DEFAULT_SUBKLEDDIT_BASE + "/submission/subkleddit";

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
      "Content!",
      SubmissionType.TEXT.toString()
    );
    Response response = post(form, getPath(SUBKLEDDIT_POST_SUBMISSION));
    assertResponseIsCreated(response);
    SubmissionSimpleDto submissionDto = JsonUtils.jsonToObject(response.readEntity(String.class), SubmissionSimpleDto.class);
    return submissionDto.getSubmissionId();
  }

  protected Response post(SubmissionForm form) {
    return post(form, getPath(SUBKLEDDIT_POST_SUBMISSION));
  }

  protected Response post(SubmissionReplyForm form) {
    return post(form, getPath(SUBMISSION_POST_REPLY));
  }

  protected Response post(SubscriptionForm form) {
    return post(form, getPath(SUBKLEDDIT_SUBSCRIBE));
  }

  protected Response deleteReply(String replyId) {
    return delete(getPath(SUBMISSION_DELETE_REPLY) + "/" + replyId);
  }

  protected Response deleteSubmission(String submissionId) {
    return delete(getPath(SUBMISSION_DELETE) + "/" + submissionId);
  }

  protected List<SubkledditSimpleDto> getSubscriptions(String username) {
    Objects.requireNonNull(username);
    return getSubkleddits(get(getPath(SUBKLEDDIT_GET_SUBSCRIBED) + "/" + username));
  }

  protected long getSubscribedCount(String subkledditName) {
    return readLong(getPlainText(getPath(SUBKLEDDIT_SUBSCRIBER_COUNT) + "/" + subkledditName));
  }

  protected List<SubmissionSimpleDto> getSubmissionsForSubkleddit(String subkledditName) {
    return getSubmissions(get(getPath(SUBMISSION_GET_BY_SUBKLEDDIT) + "/" + subkledditName));
  }

  protected List<SubmissionReplyDto> getReplies(String submissionId) {
    return getReplies(get(getPath(SUBMISSION_GET_REPLIES) + "/" + submissionId));
  }

  protected List<SubmissionReplyDto> getReplies(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubmissionReplyDto.class);
  }

  protected List<SubkledditSimpleDto> getSubkleddits(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubkledditSimpleDto.class);
  }

  protected List<SubkledditSimpleDto> getAllSubkleddits() {
    return getSubkleddits(get(getPath(SUBKLEDDIT_GET_ALL)));
  }

  protected SubkledditSimpleDto getSubkledditByName(String subkledditName) {
    return getSubkledditDto(get(getPath(SUBKLEDDIT_GET_SINGLE) + "/" + subkledditName));
  }

  protected Response getSubkledditByNameResponse(String subkledditName) {
    return get(getPath(SUBKLEDDIT_GET_SINGLE) + "/" + subkledditName);
  }

  protected List<SubkledditSimpleDto> searchSubkledditsByName(String subkledditName) {
    return getSubkleddits(get(getPath(SUBKLEDDIT_SEARCH_BY_NAME) + "/" + subkledditName));
  }

  protected SubmissionSimpleDto getSubmissionById(String submissionId) {
    return getSubmission(get(getPath(SUBMISSION_GET_SINGLE) + "/" + submissionId));
  }

  protected SubkledditSimpleDto getSubkledditDto(Response response) {
    return JsonUtils.jsonToObject(response.readEntity(String.class), SubkledditSimpleDto.class);
  }

  protected List<SubmissionSimpleDto> getSubmissions(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubmissionSimpleDto.class);
  }

  protected SubmissionSimpleDto getSubmission(Response response) {
    return JsonUtils.jsonToObject(response.readEntity(String.class), SubmissionSimpleDto.class);
  }

  private String getPath(String name) {
    return properties.get(name);
  }

  private long readLong(Response response) {
    return response.readEntity(Long.class);
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
    properties.put(SUBKLEDDIT_GET_SUBSCRIBED, DEFAULT_SUBKLEDDIT_GET_SUBSCRIBED);
    properties.put(SUBKLEDDIT_SUBSCRIBER_COUNT, DEFAULT_SUBKLEDDIT_SUBSCRIBER_COUNT);
    properties.put(SUBKLEDDIT_GET_ALL, DEFAULT_SUBKLEDDIT_GET_ALL);
    properties.put(SUBKLEDDIT_GET_SINGLE, DEFAULT_SUBKLEDDIT_GET_SINGLE);
    properties.put(SUBKLEDDIT_SEARCH_BY_NAME, DEFAULT_SUBKLEDDIT_SEARCH_BY_NAME);
    properties.put(SUBMISSION_GET_SINGLE, DEFAULT_SUBMISSION_GET_SINGLE);
    properties.put(SUBMISSION_POST_REPLY, DEFAULT_SUBMISSION_POST_REPLY);
    properties.put(SUBMISSION_DELETE_REPLY, DEFAULT_SUBMISSION_DELETE_REPLY);
    properties.put(SUBMISSION_DELETE, DEFAULT_SUBMISSION_DELETE);
    properties.put(SUBMISSION_GET_REPLIES, DEFAULT_SUBMISSION_GET_REPLIES);
    properties.put(SUBMISSION_GET_BY_SUBKLEDDIT, DEFAULT_SUBMISSION_GET_BY_SUBKLEDDIT);
    return properties;
  }

}
