import {
  ADD_SUBSCRIBED_TO_SUBKLEDDIT,
  LOGIN_ERROR,
  PASSWORD_REGISTRATION_ERROR,
  REMOVE_SUBSCRIBED_TO_SUBKLEDDIT,
  SET_SUBSCRIBED_TO_SUBKLEDDITS,
  SET_TOKEN,
  SET_USERNAME,
  USERNAME_REGISTRATION_ERROR
} from './actions';

import {NetworkService as networkService} from '../../network/NetworkService';

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

const user = (state = initialState, action) => {
  switch (action.type) {
    case USERNAME_REGISTRATION_ERROR: {
      return {...state, usernameRegistrationError: action.message};
    }
    case PASSWORD_REGISTRATION_ERROR: {
      return {...state, passwordRegistrationError: action.message};
    }
    case LOGIN_ERROR: {
      return {...state, loginError: action.message};
    }
    case SET_USERNAME: {
      action.username ? localStorage.setItem('username', action.username) : localStorage.removeItem('username');
      return {...state, currentUser: {...state.currentUser, name: action.username}};
    }
    case SET_TOKEN: {
      action.token ? localStorage.setItem('jwt', action.token) : localStorage.removeItem('jwt');
      return {...state, currentUser: {...state.currentUser, token: action.token}};
    }
    case SET_SUBSCRIBED_TO_SUBKLEDDITS: {
      return {...state, subscribedToSubkleddits: [...action.subkleddits]}
    }
    case ADD_SUBSCRIBED_TO_SUBKLEDDIT: {
      return {...state, subscribedToSubkleddits: addSubkleddit(state.subscribedToSubkleddits, action.subkleddit)}
    }
    case REMOVE_SUBSCRIBED_TO_SUBKLEDDIT: {
      return {...state, subscribedToSubkleddits: removeSubkleddit(state.subscribedToSubkleddits, action.subkleddit)}
    }
    default:
      return state;
  }
};

const addSubkleddit = (subkleddits, subkledditName) => {
  return [...subkleddits, subkledditName];
};

const removeSubkleddit = (subkleddits, subkledditName) => {
  const index = subkleddits.findIndex(subkleddit => subkleddit === subkledditName);
  if(index > -1) {
    subkleddits.splice(index, 1);
  }
  return [...subkleddits];
};

export default user;