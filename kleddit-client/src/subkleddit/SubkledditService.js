import networkService from '../network/NetworkServiceFactory';
import {QueryBuilder} from '../network/QueryFilter';

const basePath = '/subkleddit';
const getAllPath = `${basePath}/all`;
const subscribedSubkledditsPath = `${basePath}/subscription/user/subkleddits/`;
const subscribePath = `${basePath}/subscription/subscribe`;
const submitPath = `${basePath}/submission/submit`;
const subscribedToSubkleddits = `${basePath}/submission/subscribed`;
const deleteSubmission = `${basePath}/submission/delete/`;

export const SubkledditService = {};

SubkledditService.getSubkleddits = function () {
  return networkService.get(`${getAllPath}`);
};

SubkledditService.getSubscribedToSubkleddits = function (username) {
  if(!username) {
    return Promise.resolve([]);
  }
  return networkService.get(`${subscribedSubkledditsPath}${username}`);
};

SubkledditService.subscribe = function (subkledditName) {
  return networkService.post(`${subscribePath}`, {
    subkledditName: subkledditName,
    subscriptionType: 'SUBSCRIBE'
  });
};

SubkledditService.unsubscribe = function (subkledditName) {
  return networkService.post(`${subscribePath}`, {
    subkledditName: subkledditName,
    subscriptionType: 'UNSUBSCRIBE'
  });
};

SubkledditService.submit = function (submissionId, subkledditName, title, content) {
  return networkService.post(`${submitPath}`, {
    submissionId,
    subkledditName,
    title,
    content
  });
};

SubkledditService.getSubmissionsForSubscribedSubkleddits = function(page = 1, limit = 15) {
  const url = QueryBuilder.create(`${subscribedToSubkleddits}`)
    .withPage(page)
    .withLimit(limit)
    .getUrl();

  return networkService.get(url);
};

SubkledditService.deleteSubmission = function(submissionId) {
  return networkService.delete(`${deleteSubmission}/${submissionId}`);
};