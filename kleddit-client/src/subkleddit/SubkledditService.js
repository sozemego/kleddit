import networkService from '../network/NetworkServiceFactory';
import {QueryBuilder} from '../network/QueryFilter';

const basePath = 'http://localhost:8080/api/0.1/subkleddit';
const getAllPath = '/all';
const subscribedSubkledditsPath = '/subscription/user/subkleddits/';
const subscribePath = '/subscription/subscribe';
const submitPath = '/submission/submit';
const subscribedToSubkleddits = '/submission/subscribed';
const deleteSubmission = '/submission/delete/';

export const SubkledditService = {};

SubkledditService.getSubkleddits = function () {
  return networkService.get(`${basePath}${getAllPath}`);
};

SubkledditService.getSubscribedToSubkleddits = function (username) {
  if(!username) {
    return Promise.resolve([]);
  }
  return networkService.get(`${basePath}${subscribedSubkledditsPath}${username}`);
};

SubkledditService.subscribe = function (subkledditName) {
  return networkService.post(`${basePath}${subscribePath}`, {
    subkledditName: subkledditName,
    subscriptionType: 'SUBSCRIBE'
  });
};

SubkledditService.unsubscribe = function (subkledditName) {
  return networkService.post(`${basePath}${subscribePath}`, {
    subkledditName: subkledditName,
    subscriptionType: 'UNSUBSCRIBE'
  });
};

SubkledditService.submit = function (submissionId, subkledditName, title, content) {
  return networkService.post(`${basePath}${submitPath}`, {
    submissionId,
    subkledditName,
    title,
    content
  });
};

SubkledditService.getSubmissionsForSubscribedSubkleddits = function(page = 1, limit = 15) {
  const url = QueryBuilder.create(`${basePath}${subscribedToSubkleddits}`)
    .withPage(page)
    .withLimit(limit)
    .getUrl();

  return networkService.get(url);
};

SubkledditService.deleteSubmission = function(submissionId) {
  return networkService.delete(`${basePath}${deleteSubmission}${submissionId}`);
};