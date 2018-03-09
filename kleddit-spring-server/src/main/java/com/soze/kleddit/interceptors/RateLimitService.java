package com.soze.kleddit.interceptors;

public interface RateLimitService {

  void applyFilter(RateLimit rateLimit, String user, LimitedResource limitedResource);

}
