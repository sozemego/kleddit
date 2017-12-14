package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubkledditSimpleDto;
import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.dto.SubscriptionType;
import com.soze.kleddit.user.test.HttpClientTestAuthHelper;
import com.soze.kleddit.utils.http.HttpClient;
import com.soze.kleddit.utils.json.JsonUtils;
import com.soze.kleddit.utils.sql.DatabaseReset;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.List;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.*;
import static org.junit.Assert.assertEquals;

public class SubkledditSubscribeSystemTest {

  private final String subscribe = "subscription/subscribe/";
  private final String userSubscriptions = "subscription/user/subkleddits/";
  private final String subkledditSubscriptions = "subscription/subkleddit/subscriptions/";

  private HttpClient client;
  private HttpClientTestAuthHelper authHelper;

  @Before
  public void setup() throws Exception {
    DatabaseReset.resetDatabase();
    //TODO load paths from file
    client = new HttpClient("http://localhost:8080/api/0.1/subkleddit/");
    authHelper = new HttpClientTestAuthHelper("http://localhost:8080/");
  }

  @Test
  public void testSubscribeToSubkleddit() throws Exception {
    String username = "USER";
    login(username);
    String subkledditName = "General";
    SubscriptionForm form = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    Response response = client.post(form, subscribe);
    assertResponseIsOk(response);

    response = client.get(userSubscriptions + username);
    assertResponseIsOk(response);
    List<SubkledditSimpleDto> subkleddits = getSubkleddits(response);
    assertEquals(1, subkleddits.size());
    assertEquals(subkledditName, subkleddits.get(0).getName());
    response = client.getPlainText(subkledditSubscriptions + subkledditName);
    long subscriberCount = response.readEntity(Long.class);
    assertEquals(1, subscriberCount);
  }

  @Test
  public void testSubscribeToSameSubkledditTwice() throws Exception {
    String username = "USER_1";
    login(username);
    String subkledditName = "Porn";
    SubscriptionForm form = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    Response response = client.post(form, subscribe);
    assertResponseIsOk(response);

    response = client.get(userSubscriptions + username);
    List<SubkledditSimpleDto> subkleddits = getSubkleddits(response);
    assertEquals(1, subkleddits.size());
    assertEquals(subkledditName, subkleddits.get(0).getName());
    response = client.getPlainText(subkledditSubscriptions + subkledditName);
    long subscriberCount = response.readEntity(Long.class);
    assertEquals(1L, subscriberCount);

    response = client.post(form, subscribe);
    assertResponseIsBadRequest(response);

    response = client.get(userSubscriptions + username);
    subkleddits = getSubkleddits(response);
    assertEquals(1, subkleddits.size());
    assertEquals(subkledditName, subkleddits.get(0).getName());
    response = client.getPlainText(subkledditSubscriptions + subkledditName);
    subscriberCount = response.readEntity(Long.class);
    assertEquals(1L, subscriberCount);
  }

  @Test
  public void testUnsubscribeFromSubkleddit() throws Exception {
    String username = "USER_2";
    login(username);
    String subkledditName = "Gifs";
    SubscriptionForm form = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    Response response = client.post(form, subscribe);
    assertResponseIsOk(response);

    response = client.get(userSubscriptions + username);
    List<SubkledditSimpleDto> subkleddits = getSubkleddits(response);
    assertEquals(1, subkleddits.size());
    assertEquals(subkledditName, subkleddits.get(0).getName());
    response = client.getPlainText(subkledditSubscriptions + subkledditName);
    long subscriberCount = response.readEntity(Long.class);
    assertEquals(1L, subscriberCount);

    form = new SubscriptionForm(subkledditName, SubscriptionType.UNSUBSCRIBE);
    response = client.post(form, subscribe);
    assertResponseIsOk(response);

    response = client.get(userSubscriptions + username);
    subkleddits = getSubkleddits(response);
    assertEquals(0, subkleddits.size());
    response = client.getPlainText(subkledditSubscriptions + subkledditName);
    subscriberCount = response.readEntity(Long.class);
    assertEquals(0L, subscriberCount);
  }

  @Test
  public void testUnsubscribeFromSubkledditNotSubscribed() throws Exception {
    String username = "USER_3";
    login(username);
    String subkledditName = "Pictures";
    SubscriptionForm form = new SubscriptionForm(subkledditName, SubscriptionType.UNSUBSCRIBE);

    Response response = client.post(form, subscribe);

    assertResponseIsBadRequest(response);
  }

  @Test
  public void testGetSubscribedSubkledditsForUser() throws Exception {
    String username = "USER_10";
    login(username);

    client.post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE), subscribe);
    client.post(new SubscriptionForm("Gifs", SubscriptionType.SUBSCRIBE), subscribe);
    client.post(new SubscriptionForm("Porn", SubscriptionType.SUBSCRIBE), subscribe);
    client.post(new SubscriptionForm("Pictures", SubscriptionType.SUBSCRIBE), subscribe);
    client.post(new SubscriptionForm("News", SubscriptionType.SUBSCRIBE), subscribe);

    Response response = client.get(userSubscriptions + username);
    List<SubkledditSimpleDto> subkleddits = getSubkleddits(response);
    assertEquals(5, subkleddits.size());
  }

  @Test
  public void testGetNumberOfSubscriptions() throws Exception {
    login("USER_25");
    client.post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE), subscribe);
    login("USER_26");
    client.post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE), subscribe);
    login("USER_27");
    client.post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE), subscribe);
    login("USER_28");
    client.post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE), subscribe);

    Response response = client.getPlainText(subkledditSubscriptions + "General");
    long subscriberCount = response.readEntity(Long.class);
    assertEquals(4, subscriberCount);
  }

  @Test
  public void testSubscribeCaseInsensitive() throws Exception {
    login("USER_30");
    client.post(new SubscriptionForm("GeNeRaL", SubscriptionType.SUBSCRIBE), subscribe);

    Response response = client.getPlainText(subkledditSubscriptions + "General");
    long subscriberCount = response.readEntity(Long.class);
    assertEquals(1, subscriberCount);
  }

  @Test
  public void testSubscribeUnauthorized() throws Exception {
    Response response = client.post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE), subscribe);
    assertResponseIsUnauthorized(response);
  }

  @Test
  public void testUnsubscribeUnauthorized() throws Exception {
    Response response = client.post(new SubscriptionForm("General", SubscriptionType.UNSUBSCRIBE), subscribe);
    assertResponseIsUnauthorized(response);
  }

  private void login(String username) {
    authHelper.login(username);
    client.setToken(authHelper.getToken(username));
  }

  private List<SubkledditSimpleDto> getSubkleddits(Response response) {
    return JsonUtils.jsonToList(response.readEntity(String.class), SubkledditSimpleDto.class);
  }

}
