import networkService from '../network/NetworkServiceFactory';
import {QueryBuilder} from '../network/QueryFilter';

const basePath = '/subkleddit';
const getSubmissions = `${basePath}/submission/reply`;
const submitPath = `${basePath}/submission/submit`;
const subscribedToSubkleddits = `${basePath}/submission/subscribed`;
const deleteSubmission = `${basePath}/submission/delete`;

export const SubmissionService = {};

SubmissionService.getReplies = function(submissionId, page = 1, limit = 15) {
  const queryFilter = QueryBuilder.create(`${getSubmissions}/${submissionId}`)
    .withPage(page)
    .withLimit(limit);
  return networkService.get(queryFilter.getUrl());
};

SubmissionService.submit = function (submissionId, subkledditName, title, content) {
  return networkService.post(`${submitPath}`, {
    submissionId,
    subkledditName,
    title,
    content
  });
};

SubmissionService.getSubmissionsForSubscribedSubkleddits = function(page = 1, limit = 15) {
  const url = QueryBuilder.create(`${subscribedToSubkleddits}`)
    .withPage(page)
    .withLimit(limit)
    .getUrl();

  return networkService.get(url);
};

SubmissionService.deleteSubmission = function(submissionId) {
  return networkService.delete(`${deleteSubmission}/${submissionId}`);
};