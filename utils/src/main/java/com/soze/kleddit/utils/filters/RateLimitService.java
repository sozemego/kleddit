package com.soze.kleddit.utils.filters;

public interface RateLimitService {

  void applyFilter(RateLimited rateLimited, String user, Object limitedObject);

}
