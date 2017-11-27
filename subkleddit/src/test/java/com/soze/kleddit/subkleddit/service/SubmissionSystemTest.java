package com.soze.kleddit.subkleddit.service;

import com.soze.kleddit.subkleddit.dto.SubmissionForm;
import com.soze.kleddit.subkleddit.dto.SubscriptionForm;
import com.soze.kleddit.subkleddit.dto.SubscriptionType;
import com.soze.kleddit.subkleddit.entity.SubmissionId;
import com.soze.kleddit.user.test.HttpClientTestAuthHelper;
import com.soze.kleddit.utils.http.HttpClient;
import org.jboss.arquillian.container.test.api.Deployment;
import org.jboss.arquillian.container.test.api.RunAsClient;
import org.jboss.arquillian.junit.Arquillian;
import org.jboss.arquillian.test.api.ArquillianResource;
import org.jboss.shrinkwrap.api.ShrinkWrap;
import org.jboss.shrinkwrap.api.asset.EmptyAsset;
import org.jboss.shrinkwrap.api.spec.WebArchive;
import org.jboss.shrinkwrap.resolver.api.maven.Maven;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;

import javax.ws.rs.core.Response;
import java.io.File;
import java.net.URI;
import java.time.OffsetDateTime;

import static com.soze.kleddit.utils.http.ResponseAssertUtils.assertResponseIsCreated;
import static com.soze.kleddit.utils.http.ResponseAssertUtils.assertResponseIsOk;

@RunWith(Arquillian.class)
@RunAsClient
public class SubmissionSystemTest {

  @Deployment
  public static WebArchive createDeployment() {

    File[] files = Maven.resolver()
      .loadPomFromFile("subkleddit/pom.xml")
      .importRuntimeAndTestDependencies()
      .resolve()
      .withTransitivity()
      .asFile();

    WebArchive arch = ShrinkWrap.create(WebArchive.class)
      .addPackages(true, "com.soze.kleddit.subkleddit")
      .addAsResource("META-INF/persistence-int.xml", "META-INF/persistence.xml")
      .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml")
      .addAsLibraries(files);

    return arch;
  }

  @ArquillianResource
  private URI uri;

  private HttpClient client;
  private HttpClientTestAuthHelper authHelper;

  private final String getAllSubmissions = "submission/subkleddit/";
  private final String postSubmission = "submission/submit/";

  private final String subscribe = "subscription/subscribe/";

  @Before
  public void setup() throws Exception {
    client = new HttpClient(uri);
    authHelper = new HttpClientTestAuthHelper(uri);
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

  private void login(String username) {
    authHelper.login(username);
    client.setToken(authHelper.getToken(username));
  }

}
