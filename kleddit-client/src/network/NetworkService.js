import axios from 'axios';
import { store } from '../state/init';
import { fetching, stopFetching } from '../main/actions';
import { networkConfig } from '../config/network';

const fetch = () => store.dispatch(fetching());

const fetched = ({data}) => {
  store.dispatch(stopFetching());
  return data;
};

const fetchedError = (error) => {
  store.dispatch(stopFetching());
  throw error;
};

axios.interceptors.request.use((config) => {
  fetch();
  return config;
});

axios.interceptors.response.use(fetched, fetchedError);

export const NetworkService = {};

NetworkService.delete = (path) => {
  return axios.delete(applyPath(path));
};

NetworkService.post = (path, payload) => {
  return axios.post(applyPath(path), payload);
};

NetworkService.get = (path) => {
  return axios.get(applyPath(path));
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

NetworkService.setAuthorizationToken = (token) => {
  if (!token || typeof token !== 'string') {
    throw new Error(`Token has to be defined and be a string, it was ${token}.`);
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

NetworkService.clearAuthorizationToken = () => {
  delete axios.defaults.headers.common['Authorization'];
};
