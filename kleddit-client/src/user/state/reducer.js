import * as USER_ACTIONS from './actions';
import _ from 'lodash';

import {NetworkService as networkService} from '../../network/NetworkService';
import {createReducer} from '../../state/utils';

const anonymousUser = {
  name: null,
  token: null
};

//TODO abstraction over localStorage
const _getCurrentUser = () => {
  const name = localStorage.getItem('username');
  const token = localStorage.getItem('jwt');

  if (!name || !token) {
    return anonymousUser;
  }

  networkService.setAuthorizationToken(token);
  return {name, token};
};

const initialState = {

  currentUser: _getCurrentUser(),
  usernameRegistrationError: null,
  passwordRegistrationError: null,
  loginError: null,
  subscribedToSubkleddits: []

};

const setUsernameRegistrationError = (state, action) => {
  return {...state, usernameRegistrationError: action.message};
};

const setPasswordRegistrationError = (state, action) => {
  return {...state, passwordRegistrationError: action.message};
};

const setLoginError = (state, action) => {
  return {...state, loginError: action.message};
};

const setUsername = (state, action) => {
  action.username ? localStorage.setItem('username', action.username) : localStorage.removeItem('username');
  return {...state, currentUser: {...state.currentUser, name: action.username}};
};

const setToken = (state, action) => {
  action.token ? localStorage.setItem('jwt', action.token) : localStorage.removeItem('jwt');
  return {...state, currentUser: {...state.currentUser, token: action.token}};
};

const setSubscribedToSubkleddits = (state, action) => {
  return {...state, subscribedToSubkleddits: [...action.subkleddits]}
};

const addSubscribedToSubkleddit = (state, action) => {
  const nextSubkleddits = [...state.subscribedToSubkleddits, action.subkleddit];
  return {...state, subscribedToSubkleddits: nextSubkleddits}
};

const removeSubscribedToSubkleddit = (state, action) => {
  const subscribedToSubkleddits = [...state.subscribedToSubkleddits];
  _.remove(subscribedToSubkleddits, n => n === action.subkleddit);
  return {...state, subscribedToSubkleddits}
};

const user = createReducer(initialState, {
  [USER_ACTIONS.USERNAME_REGISTRATION_ERROR]: setUsernameRegistrationError,
  [USER_ACTIONS.PASSWORD_REGISTRATION_ERROR]: setPasswordRegistrationError,
  [USER_ACTIONS.LOGIN_ERROR]: setLoginError,
  [USER_ACTIONS.SET_USERNAME]: setUsername,
  [USER_ACTIONS.SET_TOKEN]: setToken,
  [USER_ACTIONS.SET_SUBSCRIBED_TO_SUBKLEDDITS]: setSubscribedToSubkleddits,
  [USER_ACTIONS.ADD_SUBSCRIBED_TO_SUBKLEDDIT]: addSubscribedToSubkleddit,
  [USER_ACTIONS.REMOVE_SUBSCRIBED_TO_SUBKLEDDIT]: removeSubscribedToSubkleddit
});

export default user;