package com.soze.kleddit.user.service;

import com.soze.kleddit.user.dto.ChangePasswordForm;
import com.soze.kleddit.user.dto.Jwt;
import com.soze.kleddit.user.dto.LoginForm;
import com.soze.kleddit.user.dto.RegisterUserForm;
import com.soze.kleddit.user.exceptions.AuthUserDoesNotExistException;
import com.soze.kleddit.user.exceptions.IdenticalPasswordChangeException;
import com.soze.kleddit.user.exceptions.InvalidPasswordException;
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

import javax.ejb.EJBException;
import javax.inject.Inject;
import java.io.File;
import java.net.URI;

import static org.junit.Assert.*;

@RunWith(Arquillian.class)
@RunAsClient
public class AuthSystemTest {

  @Deployment
  public static WebArchive createDeployment() {

    File[] files = Maven.resolver()
      .loadPomFromFile("user/pom.xml")
      .importRuntimeAndTestDependencies()
      .resolve()
      .withTransitivity()
      .asFile();

    for (File file : files) {
      System.out.println(file.getAbsolutePath());
    }

    WebArchive arch = ShrinkWrap.create(WebArchive.class)
      .addPackages(true, "com.soze.kleddit.user")
      .addAsResource("META-INF/persistence-int.xml", "META-INF/persistence.xml")
      .addAsManifestResource(EmptyAsset.INSTANCE, "beans.xml")
      .addAsLibraries(files);

    System.out.println(arch.toString(true));

    return arch;
  }

  @ArquillianResource
  private URI uri;


  @Before
  public void setup() {

  }

  @Inject
  private UserService userService;

  @Inject
  private AuthService authService;

  @Test
  public void testNullLoginForm() throws Exception {
    testEJBExceptionCause(() -> authService.login(null), NullPointerException.class);
  }

  @Test(expected = AuthUserDoesNotExistException.class)
  public void testUserDoesNotExist() throws Exception {
    LoginForm form = new LoginForm("USER", "password".toCharArray());
    authService.login(form);
  }

  @Test(expected = InvalidPasswordException.class)
  public void testPasswordDoesNotMatch() throws Exception {
    RegisterUserForm registerUserForm = new RegisterUserForm("soze", "password".toCharArray());
    userService.addUser(registerUserForm);
    LoginForm form = new LoginForm("soze", "differentpassword".toCharArray());
    authService.login(form);
  }

  @Test
  public void testShouldReturnJWT() throws Exception {
    RegisterUserForm registerUserForm = new RegisterUserForm("soze1", "password".toCharArray());
    userService.addUser(registerUserForm);

    Jwt jwt = authService.login(new LoginForm("soze1", "password".toCharArray()));
    assertFalse(jwt == null);
    assertFalse(jwt.getJwt().isEmpty());
  }

  @Test
  public void testJWTShouldBeValid() throws Exception {
    RegisterUserForm registerUserForm = new RegisterUserForm("soze2", "password".toCharArray());
    userService.addUser(registerUserForm);

    Jwt jwt = authService.login(new LoginForm("soze2", "password".toCharArray()));
    assertFalse(jwt == null);
    assertFalse(jwt.getJwt().isEmpty());
    assertTrue(authService.validateToken(jwt.getJwt()));
  }

  @Test
  public void testChangedJWTShouldBeInvalid() throws Exception {
    RegisterUserForm registerUserForm = new RegisterUserForm("soze3", "password".toCharArray());
    userService.addUser(registerUserForm);

    Jwt jwt = authService.login(new LoginForm("soze3", "password".toCharArray()));
    assertFalse(authService.validateToken(jwt.getJwt() + "tampering"));
  }

  @Test
  public void testPasswordChangeUsernameNull() throws Exception {
    testEJBExceptionCause(() -> authService.passwordChange(null, null), NullPointerException.class);
  }

  @Test
  public void testPasswordChangeFormNull() throws Exception {
    testEJBExceptionCause(() -> authService.passwordChange("username", null), NullPointerException.class);
  }

  @Test(expected = AuthUserDoesNotExistException.class)
  public void testPasswordChangeUserDoesNotExist() throws Exception {
    authService.passwordChange("weird user", new ChangePasswordForm("".toCharArray(), "".toCharArray()));
  }

  @Test(expected = InvalidPasswordException.class)
  public void testPasswordChangeInvalidPassword() throws Exception {
    RegisterUserForm registerUserForm = new RegisterUserForm("sozemego", "password".toCharArray());
    userService.addUser(registerUserForm);

    authService.passwordChange("sozemego", new ChangePasswordForm("notoldpassword".toCharArray(), "".toCharArray()));
  }

  @Test
  public void testValidPasswordChange() throws Exception {
    RegisterUserForm registerUserForm = new RegisterUserForm("sozemego1", "password".toCharArray());
    userService.addUser(registerUserForm);

    authService.passwordChange("sozemego1", new ChangePasswordForm("password".toCharArray(), "new".toCharArray()));
  }

  @Test(expected = InvalidPasswordException.class)
  public void testVerifyOldPasswordStopsWorking() throws Exception {
    RegisterUserForm registerUserForm = new RegisterUserForm("sozemego5", "password".toCharArray());
    userService.addUser(registerUserForm);

    authService.passwordChange("sozemego5", new ChangePasswordForm("password".toCharArray(), "new".toCharArray()));
    authService.login(new LoginForm("sozemego5", "password".toCharArray()));
  }

  @Test
  public void testVerifyPasswordChange() throws Exception {
    RegisterUserForm registerUserForm = new RegisterUserForm("sozemego6", "password".toCharArray());
    userService.addUser(registerUserForm);

    authService.passwordChange("sozemego6", new ChangePasswordForm("password".toCharArray(), "new".toCharArray()));
    authService.login(new LoginForm("sozemego6", "new".toCharArray()));
  }

  @Test(expected = IdenticalPasswordChangeException.class)
  public void testChangePasswordToSamePassword() throws Exception {
    RegisterUserForm registerUserForm = new RegisterUserForm("sozemego7", "abc".toCharArray());
    userService.addUser(registerUserForm);

    authService.passwordChange("sozemego7", new ChangePasswordForm("abc".toCharArray(), "abc".toCharArray()));
  }


  private void testEJBExceptionCause(Runnable runnable, Class<? extends Exception> exception) {
    try {
      runnable.run();
    } catch (EJBException e) {
      assertTrue(e.getCause().getClass() == exception);
      return;
    }
    fail();
  }


}
