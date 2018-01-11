package com.soze.kleddit.utils.filters;

public interface RateLimitService {

  void applyFilter(RateLimit rateLimit, String user, LimitedResource limitedResource);

}
