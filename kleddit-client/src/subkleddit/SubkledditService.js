import {NetworkService as networkService} from '../network/NetworkService';

const basePath = 'http://localhost:8080/api/0.1/subkleddit';
const getAllPath = "/all";
const subscribedSubkledditsPath = "/subscription/user/subkleddits/";
const subscribePath = "/subscription/subscribe";

export const SubkledditService = {};

SubkledditService.getDefaultSubkleddits = function () {
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