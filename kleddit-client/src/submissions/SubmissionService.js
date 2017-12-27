import networkService from '../network/NetworkServiceFactory';
import {QueryBuilder} from '../network/QueryFilter';

const basePath = 'http://localhost:8080/api/0.1/subkleddit/submission/reply/';

export const SubmissionService = {};

SubmissionService.getReplies = function(submissionId, page = 1, limit = 15) {
  const queryFilter = QueryBuilder.create(`${basePath}${submissionId}`)
    .withPage(page)
    .withLimit(limit);
  networkService.get(queryFilter.getUrl());
};