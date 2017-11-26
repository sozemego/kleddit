import {rootSelector} from '../../state/utils';

export const userRoot = rootSelector('user');

export const getUsernameRegistrationError = userRoot => userRoot.usernameRegistrationError;
export const getPasswordRegistrationError = userRoot => userRoot.passwordRegistrationError;

export const getLoginError = userRoot => userRoot.loginError;

export const getUsername = userRoot => userRoot.currentUser.name;
export const isLoggedIn = userRoot => !!userRoot.currentUser.token;