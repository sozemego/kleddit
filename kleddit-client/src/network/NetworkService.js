import axios from 'axios';

export const NetworkService = {};

NetworkService.delete = (path) => {
  validatePath(path);

  return axios.delete(path)
    .then(response => response.data);
};

NetworkService.post = (path, payload) => {
  validatePath(path);

  return axios.post(path, payload)
    .then(response => response.data);
};

NetworkService.get = (path) => {
  validatePath(path);

  return axios.get(path)
    .then(response => response.data); //TODO for now, extract data always. later, will throw custom errors
};

const validatePath = (path) => {
  if (!path || typeof path !== 'string') {
    throw new Error(`Path needs to be a string, it was ${path}.`);
  }
};

NetworkService.setAuthorizationToken = function (token) {
  if (!token || typeof token !== 'string') {
    throw new Error(`Token has to be defined and be a string, it was ${token}.`);
  }

  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

NetworkService.clearAuthorizationToken = function() {
  delete axios.defaults.headers.common['Authorization'];
};
