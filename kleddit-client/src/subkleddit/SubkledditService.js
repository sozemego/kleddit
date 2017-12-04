import {NetworkService as networkService} from '../network/NetworkService';

const basePath = 'http://localhost:8080/api/0.1/subkleddit';
const getAllPath = '/all';
const subscribedSubkledditsPath = '/subscription/user/subkleddits/';
const subscribePath = '/subscription/subscribe';
const submitPath = '/submission/submit';
const subscribedToSubkleddits = '/submission/subscribed';

export const SubkledditService = {};

SubkledditService.getSubkleddits = function () {
  return networkService.get(`${basePath}${getAllPath}`);
};

SubkledditService.getSubscribedToSubkleddits = function (username) {
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

SubkledditService.submit = function (submissionId, submissionTime, subkledditName, title, content) {
  return networkService.post(`${basePath}${submitPath}`, {
    submissionId,
    submissionTime,
    subkledditName,
    title,
    content
  });
};

SubkledditService.getSubmissionsForSubscribedSubkleddits = function() {
  return networkService.get(`${basePath}${subscribedToSubkleddits}`);
};