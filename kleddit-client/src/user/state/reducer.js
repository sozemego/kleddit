import {
  LOGIN_ERROR,
  PASSWORD_REGISTRATION_ERROR,
  SET_TOKEN,
  SET_USERNAME,
  USERNAME_REGISTRATION_ERROR
} from './actions';

const anonymousUser = {
  name: 'Anonymous',
  token: null
};

//TODO abstraction over localStorage
const _getCurrentUser = () => {
  const name = localStorage.getItem('username');
  const token = localStorage.getItem('jwt');

  if (!name || !token) {
    return anonymousUser;
  }

  return {name, token};
};

const initialState = {

  currentUser: _getCurrentUser(),
  usernameRegistrationError: null,
  passwordRegistrationError: null,
  loginError: null

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
    default:
      return state;
  }
};

export default user;