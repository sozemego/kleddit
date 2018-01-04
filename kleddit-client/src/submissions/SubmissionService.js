import networkService from '../network/NetworkServiceFactory';
import { QueryBuilder } from '../network/QueryFilter';

const base = '/subkleddit';

const submitPath = `${base}/submission/submit`;
const subscribedToSubkleddits = `${base}/submission/subscribed`;
const deleteSubmission = `${base}/submission/delete`;
const single = `${base}/submission/single`;
const reply = '/submission/reply';
const getReplies = `${base}${reply}`;
const postReply = `${base}${reply}`;

export const SubmissionService = {};

SubmissionService.submit = function (subkledditName, title, content) {
  return networkService.post(`${submitPath}`, {
    subkledditName,
    title,
    content,
  });
};

SubmissionService.getSubmissionById = function(submissionId) {
  return networkService.get(`${single}/${submissionId}`);
};

SubmissionService.getSubmissionsForSubscribedSubkleddits = function (page = 1, limit = 15) {
  const url = QueryBuilder.create(`${subscribedToSubkleddits}`)
    .withPage(page)
    .withLimit(limit)
    .getUrl();

  return networkService.get(url);
};

SubmissionService.deleteSubmission = function (submissionId) {
  return networkService.delete(`${deleteSubmission}/${submissionId}`);
};

SubmissionService.getReplies = function (submissionId, page = 1, limit = 15) {
  const queryFilter = QueryBuilder.create(`${getReplies}/${submissionId}`)
    .withPage(page)
    .withLimit(limit);
  return networkService.get(queryFilter.getUrl());
};

SubmissionService.postReply = function (submissionId, content) {
  return networkService.post(`${postReply}`, {
    submissionId,
    content,
  });
};