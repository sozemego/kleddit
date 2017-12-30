import {UserService as userService} from '../UserService';
import {NavigationService as navigationService} from '../../navigation/NavigationService';
import {NetworkService as networkService} from '../../network/NetworkService';
import {SubkledditService as subkledditService} from "../../subkleddit/SubkledditService";
import {makeActionCreator} from '../../state/utils';
import {getUsername} from './selectors';
import {afterLogout} from '../../app/actions';

export const onRegister = (username, password) => {
  return (dispatch, getState) => {

    return dispatch(logout())
      .then(() => userService.registerUser(username, password))
      .then(() => {
        return login(username, password);
      })
      .then((token) => {
        dispatch(setUsername(username));
        dispatch(setToken(token));
        dispatch(clearForms());
        networkService.setAuthorizationToken(token);
        navigationService.mainPage();
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

    return login(username, password)
      .then(token => {
        dispatch(setUsername(username));
        dispatch(setToken(token));
        networkService.setAuthorizationToken(token);
        navigationService.mainPage();
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
    networkService.clearAuthorizationToken();
    dispatch(setUsername('Anonymous'));
    dispatch(afterLogout());
    return dispatch(clearForms());
  };
};

export const deleteUser = () => {
  return (dispatch, getState) => {

    return userService
      .delete()
      .then(() => dispatch(logout()))
      .then(() => navigationService.mainPage())

  };
};

export const clearForms = () => {
  return (dispatch, getState) => {
    dispatch(loginError(null));
    dispatch(usernameRegistrationError(null));
    dispatch(passwordRegistrationError(null));
    return Promise.resolve();
  };
};

//TODO move to main page?
export const subscribe = (subkledditName) => {
  return (dispatch, getState) => {

    return subkledditService.subscribe(subkledditName)
      .then(() => dispatch(addSubscribedToSubkleddit(subkledditName)))
  }
};

//TODO move to main page?
export const unsubscribe = (subkledditName) => {
  return (dispatch, getState) => {

    return subkledditService.unsubscribe(subkledditName)
      .then(() => dispatch(removeSubscribedToSubkleddit(subkledditName)))
  }
};

export const getSubscribedToSubkleddits = () => {
  return (dispatch, getState) => {

    const username = getUsername(getState);
    if(!username) {
      return Promise.resolve();
    }
    return subkledditService.getSubscribedToSubkleddits(username)
      .then(subkleddits => dispatch(setSubscribedToSubkleddits(subkleddits.map(subkleddit => subkleddit.name))));
  }
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

export const ADD_SUBSCRIBED_TO_SUBKLEDDIT = 'ADD_SUBSCRIBED_TO_SUBKLEDDIT';
const addSubscribedToSubkleddit = makeActionCreator(ADD_SUBSCRIBED_TO_SUBKLEDDIT, 'subkleddit');

export const REMOVE_SUBSCRIBED_TO_SUBKLEDDIT = 'REMOVE_SUBSCRIBED_TO_SUBKLEDDIT';
const removeSubscribedToSubkleddit = makeActionCreator(REMOVE_SUBSCRIBED_TO_SUBKLEDDIT, 'subkleddit');

export const SET_SUBSCRIBED_TO_SUBKLEDDITS = 'SET_SUBSCRIBED_TO_SUBKLEDDITS';
export const setSubscribedToSubkleddits = makeActionCreator(SET_SUBSCRIBED_TO_SUBKLEDDITS, 'subkleddits');