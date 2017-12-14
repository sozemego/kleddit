package com.soze.kleddit.user.test;

import com.soze.kleddit.user.dto.Jwt;
import com.soze.kleddit.user.dto.LoginForm;
import com.soze.kleddit.user.dto.RegisterUserForm;
import com.soze.kleddit.utils.CommonUtils;
import com.soze.kleddit.utils.http.HttpClient;
import com.soze.kleddit.utils.json.JsonUtils;

import javax.ws.rs.core.Response;
import java.net.URI;
import java.util.HashMap;
import java.util.Map;

public class HttpClientTestAuthHelper {

  private static final String USER_BASE_PATH = "api/0.1/user";

  private static final String LOGIN_PATH = "/auth/login";
  private static final String REGISTER_PATH = "/register";

  private final HttpClient httpClient;

  private final Map<String, String> userTokenMap = new HashMap<>();
  private final Map<String, String> userPasswordMap = new HashMap<>();

  public HttpClientTestAuthHelper(URI uri) throws Exception {
    URI userUri = URI.create(uri.getScheme() + "://" + uri.getHost() + ":" + uri.getPort() + "/" + USER_BASE_PATH);
    this.httpClient = new HttpClient(userUri);
  }

  public HttpClientTestAuthHelper(String path) throws Exception {
    this.httpClient = new HttpClient(path + USER_BASE_PATH);
  }

  public void login(String username) {
    register(username);

    userTokenMap.computeIfAbsent(username, (key) -> {
      LoginForm form = new LoginForm(username, userPasswordMap.get(username).toCharArray());
      Response response = httpClient.post(form, LOGIN_PATH);
      Jwt token = JsonUtils.jsonToObject(response.readEntity(String.class), Jwt.class);
      return token.getJwt();
    });

  }

  public void register(String username) {

    userPasswordMap.computeIfAbsent(username, (key) -> {
      String randomPassword = CommonUtils.generateRandomString(15);
      RegisterUserForm form = new RegisterUserForm(username, randomPassword.toCharArray());

      httpClient.post(form, REGISTER_PATH);
      return randomPassword;
    });

  }

  public String getToken(String username) {
    return userTokenMap.get(username);
  }


}
