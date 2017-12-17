package com.soze.kleddit.utils.filters;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.ws.rs.container.ContainerRequestContext;
import javax.ws.rs.container.ContainerResponseContext;
import javax.ws.rs.container.ContainerResponseFilter;
import javax.ws.rs.ext.Provider;
import java.io.IOException;
import java.util.Objects;

@Log
@Provider
public class ResponseLoggingFilter implements ContainerResponseFilter {

  private static final Logger LOG = LoggerFactory.getLogger(ResponseLoggingFilter.class);

  @Override
  public void filter(ContainerRequestContext requestContext, ContainerResponseContext responseContext) throws IOException {
    LOG.info("For API call at: [{}] status code was: [{}]. Response body was [{}]",
      requestContext.getUriInfo().getAbsolutePath(),
      responseContext.getStatus(),
      Objects.toString(responseContext.getEntity())
    );

  }
}
