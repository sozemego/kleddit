package com.soze.kleddit.utils.filters;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.servlet.http.HttpServletRequest;
import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.SecurityContext;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.security.Principal;

@RateLimited
@Provider
public class RateLimitedFilter implements ContainerRequestFilter {

  private static final Logger LOG = LoggerFactory.getLogger(RateLimitedFilter.class);

  @Context
  private ResourceInfo resourceInfo;

  @Context
  private SecurityContext securityContext;

  @Context
  private HttpServletRequest httpServletRequest;

  @Inject
  private RateLimitService rateLimitService;

  @Override
  public void filter(final ContainerRequestContext requestContext) throws IOException {
    RateLimited resourceAnnotation = resourceInfo.getResourceClass().getAnnotation(RateLimited.class);
    RateLimited methodAnnotation = resourceInfo.getResourceMethod().getAnnotation(RateLimited.class);

    //1. get the annotation to use
    //method values override type values
    RateLimited annotation = methodAnnotation != null ? methodAnnotation : resourceAnnotation;

    //2. create a value object for the resource
    LimitedResource limitedResource = new LimitedResource(
      resourceInfo.getResourceMethod(),
      requestContext.getMethod(),
      requestContext.getUriInfo().getPath()
    );

    //3. find the user name or IP if anonymous
    Principal principal = securityContext.getUserPrincipal();
    String user = principal != null ? principal.getName() : httpServletRequest.getRemoteAddr();

    //3. apply rate limiting filter for this method and user
    rateLimitService.applyFilter(getRateLimit(annotation), user, limitedResource);
  }

  private RateLimit getRateLimit(RateLimited rateLimited) {
    return new RateLimit(
      rateLimited.limit(),
      rateLimited.timeUnit(),
      rateLimited.timeUnits()
    );
  }

}
