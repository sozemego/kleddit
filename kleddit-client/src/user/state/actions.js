import {UserService as userService} from '../UserService';
import {NavigationService as navigationService} from '../../navigation/NavigationService';
import {NetworkService as networkService} from '../../network/NetworkService';
import {makeActionCreator} from '../../state/utils';
import {userRoot} from './selectors';

const getRoot = getState => userRoot(getState());

export const onRegister = (username, password) => {
  return (dispatch, getState) => {

    const user = getRoot(getState);

    userService.registerUser(username, password)
      .then(() => {
        return login(username, password);
      })
      .then((token) => {
        dispatch(setUsername(username));
        dispatch(setToken(token));
        dispatch(clearForms());
        networkService.setAuthorizationToken(token);
        navigationService.profile();
      })
      .catch(error => {
        if (error.field === 'username') {
          return dispatch(usernameRegistrationError(error.message));
        }
        if (error.field === 'password') {
          return dispatch(passwordRegistrationError(error.message));
        }
        console.log(error);
      });

  };
};

let checkUsernameAvailableTimerId;

const checkUsernameAvailableTimer = (username, dispatch) => {
  clearTimeout(checkUsernameAvailableTimerId);

  checkUsernameAvailableTimerId = setTimeout(() => {
    userService.checkUsernameAvailability(username)
      .then(isAvailable => {
        if (!isAvailable) {
          dispatch(usernameRegistrationError(`${username} already exists`));
        }
      });
  }, 250);
};

export const onRegisterUsernameChange = (username) => {
  return (dispatch, getState) => {

    dispatch(usernameRegistrationError(null));

    const validationError = userService.validateUsername(username);
    if (validationError) {
      dispatch(usernameRegistrationError(validationError));
    } else {
      checkUsernameAvailableTimer(username, dispatch);
    }

  };
};

export const onRegisterPasswordChange = (username) => {
  return (dispatch, getState) => {

    dispatch(passwordRegistrationError(null));

    const validationError = userService.validatePassword(username);
    if (validationError) {
      dispatch(passwordRegistrationError(validationError));
    }

  };
};

export const onLogin = (username, password) => {
  return (dispatch, getState) => {

    login(username, password)
      .then(token => {
        dispatch(setUsername(username));
        dispatch(setToken(token));
        networkService.setAuthorizationToken(token);
        navigationService.profile();
        dispatch(clearForms());
      })
      .catch(error => dispatch(loginError(error)));

  };
};

const login = (username, password) => {
  return userService.login(username, password);
};

export const onLoginUsernameChange = (username) => {
  return (dispatch, getState) => {
    dispatch(loginError(null));
  };
};

export const onLoginPasswordChange = (password) => {
  return (dispatch, getState) => {
    dispatch(loginError(null));
  };
};

export const logout = () => {
  return (dispatch, getState) => {
    dispatch(setToken(null));
    dispatch(setUsername('Anonymous'));
    navigationService.refresh();
    dispatch(clearForms());
  };
};

export const deleteUser = () => {
  return (dispatch, getState) => {

    userService
      .delete()
      .then(() => dispatch(logout()))
      .then(() => navigationService.mainPage());

  };
};

const clearForms = () => {
  return (dispatch, getState) => {
    dispatch(loginError(null));
    dispatch(usernameRegistrationError(null));
    dispatch(passwordRegistrationError(null));
  };
};

export const USERNAME_REGISTRATION_ERROR = 'USERNAME_REGISTRATION_ERROR';
const usernameRegistrationError = makeActionCreator(USERNAME_REGISTRATION_ERROR, 'message');

export const PASSWORD_REGISTRATION_ERROR = 'PASSWORD_REGISTRATION_ERROR';
const passwordRegistrationError = makeActionCreator(PASSWORD_REGISTRATION_ERROR, 'message');

export const LOGIN_ERROR = 'LOGIN_ERROR';
const loginError = makeActionCreator(LOGIN_ERROR, 'message');

export const SET_USERNAME = 'SET_USERNAME';
const setUsername = makeActionCreator(SET_USERNAME, 'username');

export const SET_TOKEN = 'SET_TOKEN';
const setToken = makeActionCreator(SET_TOKEN, 'token');
