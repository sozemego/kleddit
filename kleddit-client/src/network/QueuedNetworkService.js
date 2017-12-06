import {NetworkService as networkService} from './NetworkService';
import _ from 'lodash';

let isFetching = false;

const requestQueue = {

};

const requestIdTries = {

};

const _requestIds = [];
const _requestIdsFetched = [];

const MAX_REQUEST_TRIES = 125;

const pushToQueue = (request) => {
  if(typeof request !== 'function') {
    throw new Error('Request has to be a function');
  }

  const requestId = Math.random();
  requestQueue[requestId] = request;
  _requestIds.push(requestId);
  return requestId;
};

const advanceQueue = (requestId) => {
  if(isFetching) {
    let tries = _.get(requestIdTries, `[${requestId}]`, 1);
    _.set(requestIdTries, `[${requestId}]`, ++tries);

    if(tries > MAX_REQUEST_TRIES) {
      return Promise.reject('Ops');
    }

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        advanceQueue(requestId).then(resolve, reject);
      }, 5000);
    });
  }

  isFetching = true;

  const request = requestQueue[requestId];
  if(!request) {
    throw new Error('Invalid requestId!');
  }

  console.log(`Currently ${_.size(requestQueue)} requests in queue.`);

  return request()
    .then((response) => {
      isFetching = false;
      delete requestQueue[requestId];
      delete requestIdTries[requestId];
      _requestIdsFetched.push(requestId);
      return response;
    }, (error) => {
      isFetching = false;
      delete requestQueue[requestId];
      delete requestIdTries[requestId];
      _requestIdsFetched.push(requestId);
      throw error;
    });
};

/**
 * Experimental service for queueing requests.
 */
export const QueuedNetworkService = {};

QueuedNetworkService.get = (path) => {
  const requestId = pushToQueue(() => networkService.get(path));
  return advanceQueue(requestId);
};

QueuedNetworkService.post = (path, payload) => {
  const requestId = pushToQueue(() => networkService.post(path, payload));
  return advanceQueue(requestId);
};

QueuedNetworkService.delete = (path) => {
  const requestId = pushToQueue(() => networkService.delete(path));
  return advanceQueue(requestId);
};

