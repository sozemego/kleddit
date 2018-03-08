package com.soze.kleddit.utils.pagination;

/**
 * An object containing data about how to paginate a resource.
 */
public class Pagination {

  private final int page;
  private final int limit;

  Pagination(int page, int limit) {
    this.page = page;
    this.limit = limit;
  }

  public int getPage() {
    return page;
  }

  public int getLimit() {
    return limit;
  }

  @Override
  public String toString() {
    return "Pagination{" +
      "page=" + page +
      ", limit=" + limit +
      '}';
  }
}
