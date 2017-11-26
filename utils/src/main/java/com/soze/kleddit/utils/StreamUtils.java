package com.soze.kleddit.utils;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.function.Function;
import java.util.stream.Collectors;
import java.util.stream.Stream;

/**
 * Simple wrapper methods for some Stream methods,
 * particularly to make transformations easier.
 * These methods suck for now.
 */
public class StreamUtils {

  public static <T> Stream<T> stream(Collection<T> collection) {
    Objects.requireNonNull(collection);
    return collection.stream();
  }

  public static <T, R> Stream<R> mapToStream(Collection<T> collection, Function<T, R> function) {
    Objects.requireNonNull(collection);
    Objects.requireNonNull(function);
    return collection.stream().map(function);
  }

  public static <T, R> List<R> mapToList(Collection<T> collection, Function<T, R> function) {
    return mapToStream(collection, function).collect(Collectors.toList());
  }

  public static <T, R> List<R> mapToList(Stream<T> stream, Function<T, R> function) {
    return stream.map(function).collect(Collectors.toList());
  }


}
