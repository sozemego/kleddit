import axios from 'axios';
import _ from 'lodash';
import { store } from '../state/init';
import { networkConfig } from '../config/network';
import { fetching, setErrorMessage, stopFetching } from '../app/actions';
import { setCurrentSubmission } from '../submissions/actions';
import { setToken, setUsername } from '../user/state/actions';

const fetch = () => store.dispatch(fetching());

const fetched = ({data}) => {
  store.dispatch(stopFetching());
  return data;
};

const errorInterceptor = (error) => {
  return errorUnpacker(error)
    .then(rateLimitErrorInterceptor)
    .then(unauthorizedErrorInterceptor)
    .then(fetchedError);
};

const rateLimitErrorInterceptor = (error) => {
  if(_.get(error, `status`, 400) === 429) {
    store.dispatch(setErrorMessage('Too many requests!'));
  }
  return error;
};

const unauthorizedErrorInterceptor = (error) => {
  if(_.get(error, 'status', 400) === 401) {
    store.dispatch(setUsername(null));
    store.dispatch(setToken(null));
  }
  return error;
};

const errorUnpacker = (error) => {
  const err = {
    status: _.get(error, `response.status`, 400),
    error: _.get(error, `response.statusText`, 'error'),
    data: JSON.parse(_.get(error, `response.data.entity`, '{}')),
  };

  return Promise.resolve(err);
};

const fetchedError = (error) => {
  store.dispatch(stopFetching());
  throw error;
};

axios.interceptors.request.use((config) => {
  fetch();
  return config;
});

axios.interceptors.response.use(fetched, errorInterceptor);

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
  const { protocol, base, port, version } = networkConfig;
  return `${protocol}://${base}:${port}${version}${path}`;
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
