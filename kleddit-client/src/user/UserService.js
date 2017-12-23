import networkService from '../network/NetworkServiceFactory';

const basePath = 'http://localhost:8080/api/0.1/user';
const registerPath = '/register';
const isAvailablePath = '/single/available';
const loginPath = '/auth/login';
const deletePath = '/single/delete';

const passwordValidatorRegExp = new RegExp('^[a-zA-Z0-9_-]+$');
const maxUsernameLength = 38;
const maxPasswordLength = 128;

export const UserService = {};

UserService.registerUser = function (username, password) {
  const usernameError = this.validateUsername(username);
  if (usernameError) return Promise.reject({field: 'username', message: usernameError});

  const passwordError = this.validatePassword(password);
  if (passwordError) return Promise.reject({field: 'password', message: passwordError});

  return networkService.post(`${basePath}${registerPath}`, {username, password})
    .catch(error => {
      if (error.response) {
        const response = error.response.data;
        return Promise.reject({
          message: response.error,
          field: response.data.field
        });
      }
      //todo handle network errors
      console.warn(error);
    });
};

UserService.checkUsernameAvailability = function (username) {
  return networkService
    .get(`${basePath}${isAvailablePath}/${username}`);
};

UserService.login = function (username, password) {
  return networkService.post(`${basePath}${loginPath}`, {username, password})
    .then((data) => {
      return data.jwt;
    })
    .catch(error => Promise.reject('Invalid username or password!'));
};

UserService.delete = function () {
  return networkService.delete(`${basePath}${deletePath}`);
};

UserService.validateUsername = function (username) {
  if (!username) {
    return 'Username cannot be empty!';
  }

  if (!passwordValidatorRegExp.test(username)) {
    return 'Username can only contain letters, numbers, - and _!';
  }

  if (username.length > maxUsernameLength) {
    return `Username cannot be longer than ${maxUsernameLength} characters!`;
  }
};

UserService.validatePassword = function (password) {
  if (!password) {
    return 'Password cannot be empty!';
  }
  if (password.length > maxPasswordLength) {
    return `Password cannot be longer than ${maxPasswordLength} characters!`;
  }
};