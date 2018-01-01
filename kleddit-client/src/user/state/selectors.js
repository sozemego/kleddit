import { rootSelector } from '../../state/utils';

export const getUserRoot = rootSelector('user');

export const getUsernameRegistrationError = state => getUserRoot(state).usernameRegistrationError;
export const getPasswordRegistrationError = state => getUserRoot(state).passwordRegistrationError;

export const getLoginError = state => getUserRoot(state).loginError;

export const getUsername = state => getUserRoot(state).currentUser.name;
export const isLoggedIn = state => !!getUserRoot(state).currentUser.token;

export const getSubscribedToSubkleddits = state => getUserRoot(state).subscribedToSubkleddits;