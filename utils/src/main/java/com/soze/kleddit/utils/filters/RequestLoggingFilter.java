package com.soze.kleddit.utils.filters;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerRequestFilter;
import javax.ws.rs.container.ResourceInfo;
import javax.ws.rs.core.Context;
import javax.ws.rs.ext.Provider;
import java.io.IOException;

@Log
@Provider
public class RequestLoggingFilter implements ContainerRequestFilter {

  private static final Logger LOG = LoggerFactory.getLogger(RequestLoggingFilter.class);

  @Context
  private ResourceInfo resourceInfo;

  @Override
  public void filter(ContainerRequestContext requestContext) throws IOException {
    LOG.info("API CALL. Method: [{}] at [{}]. Media type [{}]",
      requestContext.getMethod(),
      requestContext.getUriInfo().getAbsolutePath(),
      requestContext.getMediaType()
    );
    LOG.info("Api className [{}]", resourceInfo.getResourceClass());

  }

}
