package com.soze.kleddit.user.api;


import com.soze.kleddit.user.service.AuthService;

import javax.annotation.Priority;
import javax.inject.Inject;
import javax.ws.rs.Priorities;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.security.Principal;

@Authenticated
@Provider
@Priority(Priorities.AUTHENTICATION)
public class AuthenticationFilter implements ContainerRequestFilter {

  private static final String AUTHENTICATION_SCHEME = "Bearer";

  @Inject
  private AuthService authService;

  @Override
  public void filter(ContainerRequestContext requestContext) throws IOException {
    String authorizationHeader = requestContext.getHeaderString(HttpHeaders.AUTHORIZATION);
    if(!isTokenBasedAuthentication(authorizationHeader)) {
      unauthorized(requestContext);
      return;
    }

    String token = authorizationHeader.substring(AUTHENTICATION_SCHEME.length()).trim();
    if(!authService.validateToken(token)) {
      unauthorized(requestContext);
      return;
    }

    String username = authService.getUsernameClaim(token);

    SecurityContext securityContext = requestContext.getSecurityContext();
    requestContext.setSecurityContext(new SecurityContext() {
      @Override
      public Principal getUserPrincipal() {
        return () -> username;
      }

      @Override
      public boolean isUserInRole(String role) {
        return true;
      }

      @Override
      public boolean isSecure() {
        return securityContext.isSecure();
      }

      @Override
      public String getAuthenticationScheme() {
        return AUTHENTICATION_SCHEME;
      }
    });

  }

  /**
   * Returns true if authorization header starts with Bearer and a space.
   */
  private boolean isTokenBasedAuthentication(String authorizationHeader) {
    return authorizationHeader != null && authorizationHeader.toLowerCase()
      .startsWith(AUTHENTICATION_SCHEME.toLowerCase() + " ");
  }

  private void unauthorized(ContainerRequestContext context) {
    context.abortWith(
      Response.status(Response.Status.UNAUTHORIZED)
        .header(HttpHeaders.WWW_AUTHENTICATE, AUTHENTICATION_SCHEME)
        .build());
  }

}
