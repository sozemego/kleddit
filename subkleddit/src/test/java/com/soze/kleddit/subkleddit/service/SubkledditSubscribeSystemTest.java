package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubkledditSimpleDto;
import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.dto.SubscriptionType;
import com.soze.kleddit.subkleddit.test.SubkledditTest;
import com.soze.kleddit.utils.sql.DatabaseReset;
import org.junit.Before;
import org.junit.Test;

import javax.ws.rs.core.Response;
import java.util.List;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.*;
import static org.junit.Assert.assertEquals;

public class SubkledditSubscribeSystemTest extends SubkledditTest {

  @Before
  public void setup() throws Exception {
    DatabaseReset.resetDatabase();
  }

  @Test
  public void testSubscribeToSubkleddit() throws Exception {
    String username = "USER";
    login(username);
    String subkledditName = "General";
    SubscriptionForm form = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    Response response = post(form);
    assertResponseIsOk(response);

    List<SubkledditSimpleDto> subkleddits = getSubscriptions(username);
    assertEquals(1, subkleddits.size());
    assertEquals(subkledditName, subkleddits.get(0).getName());
    long subscriberCount = getSubscribedCount(subkledditName);
    assertEquals(1, subscriberCount);
  }

  @Test
  public void testSubscribeToSameSubkledditTwice() throws Exception {
    String username = "USER_1";
    login(username);
    String subkledditName = "Porn";
    SubscriptionForm form = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    assertResponseIsOk(post(form));

    List<SubkledditSimpleDto> subkleddits = getSubscriptions(username);
    assertEquals(1, subkleddits.size());
    assertEquals(subkledditName, subkleddits.get(0).getName());
    long subscriberCount = getSubscribedCount(subkledditName);
    assertEquals(1L, subscriberCount);

    assertResponseIsBadRequest(post(form));

    subkleddits = getSubscriptions(username);
    assertEquals(1, subkleddits.size());
    assertEquals(subkledditName, subkleddits.get(0).getName());
    subscriberCount = getSubscribedCount(subkledditName);
    assertEquals(1L, subscriberCount);
  }

  @Test
  public void testUnsubscribeFromSubkleddit() throws Exception {
    String username = "USER_2";
    login(username);
    String subkledditName = "Gifs";
    SubscriptionForm form = new SubscriptionForm(subkledditName, SubscriptionType.SUBSCRIBE);
    assertResponseIsOk(post(form));

    List<SubkledditSimpleDto> subkleddits = getSubscriptions(username);
    assertEquals(1, subkleddits.size());
    assertEquals(subkledditName, subkleddits.get(0).getName());
    long subscriberCount = getSubscribedCount(subkledditName);
    assertEquals(1L, subscriberCount);

    assertResponseIsOk(post(new SubscriptionForm(subkledditName, SubscriptionType.UNSUBSCRIBE)));

    subkleddits = getSubscriptions(username);
    assertEquals(0, subkleddits.size());
    subscriberCount = getSubscribedCount(subkledditName);
    assertEquals(0L, subscriberCount);
  }

  @Test
  public void testUnsubscribeFromSubkledditNotSubscribed() throws Exception {
    String username = "USER_3";
    login(username);
    String subkledditName = "Pictures";
    SubscriptionForm form = new SubscriptionForm(subkledditName, SubscriptionType.UNSUBSCRIBE);

    Response response = post(form);

    assertResponseIsBadRequest(response);
  }

  @Test
  public void testGetSubscribedSubkledditsForUser() throws Exception {
    String username = "USER_10";
    login(username);

    post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE));
    post(new SubscriptionForm("Gifs", SubscriptionType.SUBSCRIBE));
    post(new SubscriptionForm("Porn", SubscriptionType.SUBSCRIBE));
    post(new SubscriptionForm("Pictures", SubscriptionType.SUBSCRIBE));
    post(new SubscriptionForm("News", SubscriptionType.SUBSCRIBE));

    List<SubkledditSimpleDto> subkleddits = getSubscriptions(username);
    assertEquals(5, subkleddits.size());
  }

  @Test
  public void testGetNumberOfSubscriptions() throws Exception {
    login("USER_25");
    post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE));
    login("USER_26");
    post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE));
    login("USER_27");
    post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE));
    login("USER_28");
    post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE));

    assertEquals(4, getSubscribedCount("GENERAL"));
  }

  @Test
  public void testSubscribeCaseInsensitive() throws Exception {
    login("USER_30");
    post(new SubscriptionForm("GeNeRaL", SubscriptionType.SUBSCRIBE));

    assertEquals(1, getSubscribedCount("General"));
  }

  @Test
  public void testSubscribeUnauthorized() throws Exception {
    Response response = post(new SubscriptionForm("General", SubscriptionType.SUBSCRIBE));
    assertResponseIsUnauthorized(response);
  }

  @Test
  public void testUnsubscribeUnauthorized() throws Exception {
    Response response = post(new SubscriptionForm("General", SubscriptionType.UNSUBSCRIBE));
    assertResponseIsUnauthorized(response);
  }

}
