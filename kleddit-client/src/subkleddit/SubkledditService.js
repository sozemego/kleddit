import networkService from '../network/NetworkServiceFactory';

const basePath = '/subkleddit';
const getAllPath = `${basePath}/all`;
const subscribedSubkledditsPath = `${basePath}/subscription/user/subkleddits/`;
const subscribePath = `${basePath}/subscription/subscribe`;

export const SubkledditService = {};

SubkledditService.getSubkleddits = function () {
  return networkService.get(`${getAllPath}`);
};

SubkledditService.getSubscribedToSubkleddits = function (username) {
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