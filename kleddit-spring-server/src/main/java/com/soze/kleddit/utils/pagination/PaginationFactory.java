package com.soze.kleddit.utils.pagination;

import static com.soze.kleddit.utils.CommonUtils.parseInt;

public class PaginationFactory {

  private static final int DEFAULT_STARTING_PAGE = 1;
  private static final int DEFAULT_PAGE_SIZE = 15;

  /**
   * Constructs a pagination object.
   * Uses default starting page {@link PaginationFactory#DEFAULT_STARTING_PAGE}.
   * Uses default page size {@link PaginationFactory#DEFAULT_PAGE_SIZE}.
   */
  public static Pagination createPagination() {
    return createPagination(DEFAULT_STARTING_PAGE, DEFAULT_PAGE_SIZE);
  }

  /**
   * Constructs a Pagination object with default page size.
   * {@link PaginationFactory#DEFAULT_PAGE_SIZE}.
   * @param page current page you want to display
   */
  public static Pagination createPagination(int page) {
    return createPagination(page, DEFAULT_PAGE_SIZE);
  }

  /**
   * This method constructs a pagination object.
   * Invalid values are wrapped to correct values to avoid
   * throwing unnecessary exceptions.
   * @param page current page you want to display
   * @param limit number of items on the page
   */
  public static Pagination createPagination(int page, int limit) {
    if(page < 1) {
      page = DEFAULT_STARTING_PAGE;
    }

    if(limit < 1) {
      limit = DEFAULT_PAGE_SIZE;
    }

    return new Pagination(page, limit);
  }

  /**
   * Creates Pagination from given page and limit given as strings.
   * Accepts both nulls, in which case it will return a pagination with default values.
   * {@link PaginationFactory#DEFAULT_STARTING_PAGE}
   * {@link PaginationFactory#DEFAULT_PAGE_SIZE}
   * @param pageStr page to show
   * @param limitStr number of elements per page
   */
  public static Pagination createPagination(String pageStr, String limitStr) {
    int page = pageStr != null ? parseInt(pageStr, DEFAULT_STARTING_PAGE) : DEFAULT_STARTING_PAGE;
    int limit = limitStr != null ? parseInt(limitStr, DEFAULT_PAGE_SIZE) : DEFAULT_PAGE_SIZE;
    return createPagination(page, limit);
  }

}
