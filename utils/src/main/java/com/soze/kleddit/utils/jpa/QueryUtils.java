package com.soze.kleddit.utils.jpa;

import com.soze.kleddit.utils.api.pagination.Pagination;

import javax.persistence.Query;

/**
 * Various utils for the {@link javax.persistence.Query} object.
 */
public class QueryUtils {

  public static void applyPagination(Query query, Pagination pagination) {
    query.setFirstResult((pagination.getPage() - 1) * pagination.getLimit());
    query.setMaxResults(pagination.getLimit());
  }

}
