import networkService from '../network/NetworkServiceFactory';
import {QueryBuilder} from '../network/QueryFilter';

const basePath = '/subkleddit';
const getSubmissions = `${basePath}/submission/reply`;

export const SubmissionService = {};

SubmissionService.getReplies = function(submissionId, page = 1, limit = 15) {
  const queryFilter = QueryBuilder.create(`${getSubmissions}/${submissionId}`)
    .withPage(page)
    .withLimit(limit);
  return networkService.get(queryFilter.getUrl());
};