package com.soze.kleddit.utils.filters;

import com.google.common.collect.HashMultimap;
import com.google.common.collect.Multimap;
import com.google.common.collect.Multimaps;

import javax.ejb.Singleton;
import java.time.Instant;
import java.util.Map;
import java.util.Objects;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.TimeUnit;

@Singleton
public class RateLimitServiceImpl implements RateLimitService {

  private final Map<Object, Multimap<String, Long>> requestHistory = new ConcurrentHashMap<>();

  //TODO dont pass annotation here, use a DTO
  @Override
  public void applyFilter(final RateLimited rateLimited, final String user, final Object limitedObject) {
    Objects.requireNonNull(rateLimited);
    Objects.requireNonNull(user);
    Objects.requireNonNull(limitedObject);

    final Multimap<String, Long> userRequests = requestHistory.compute(limitedObject, (k, v) -> {
      if (v == null) {
        v = Multimaps.synchronizedMultimap(HashMultimap.create());
      }
      return v;
    });

    final int limit = rateLimited.limit();
    final TimeUnit timeUnit = rateLimited.timeUnit();
    final int timeUnits = rateLimited.timeUnits();

    synchronized (requestHistory) {
      //1. remove all previous requests older than timeUnit * timeUnits
      //2. get count of requests remaining

      //3. if everything is ok, don't throw exception
      //4. if over limit, throw exception
      //5. add this request to the history
      //DO MAGIC HERE

      userRequests.put(user, Instant.now().toEpochMilli());
    }

  }
}
