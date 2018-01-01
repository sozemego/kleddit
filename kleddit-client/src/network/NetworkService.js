import axios from 'axios';
import { store } from '../state/init';
import { fetching, stopFetching } from '../main/actions';
import { networkConfig } from '../config/network';

const fetch = () => store.dispatch(fetching());
const fetched = (response) => {
  store.dispatch(stopFetching());
  return response;
};

const fetchedError = (error) => {
  store.dispatch(stopFetching());
  throw error;
};

export const NetworkService = {};

NetworkService.delete = (path) => {
  fetch();
  return axios.delete(applyPath(path))
    .then(response => fetched(response.data))
    .catch(error => fetchedError(error));
};

NetworkService.post = (path, payload) => {
  fetch();
  return axios.post(applyPath(path), payload)
    .then(response => fetched(response.data))
    .catch(error => fetchedError(error));
};

NetworkService.get = (path) => {
  fetch();
  return axios.get(applyPath(path))
    .then(response => fetched(response.data))
    .catch(error => fetchedError(error)); //TODO for now, extract data always. later, will throw custom errors
};

const validatePath = (path) => {
  if (!path || typeof path !== 'string') {
    throw new Error(`Path needs to be a string, it was ${path}.`);
  }
};

const applyPath = (path) => {
  validatePath(path);
  const { base, port, version } = networkConfig;
  return `${base}:${port}${version}${path}`;
};

NetworkService.setAuthorizationToken = function (token) {
  if (!token || typeof token !== 'string') {
    throw new Error(`Token has to be defined and be a string, it was ${token}.`);
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

NetworkService.clearAuthorizationToken = function () {
  delete axios.defaults.headers.common['Authorization'];
};
