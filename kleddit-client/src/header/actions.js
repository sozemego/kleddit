import {NavigationService as navigationService} from '../navigation/NavigationService';
import {logout} from '../user/state/actions';
import {getSubkleddits, loadSubmissions} from '../subkleddit/state/actions';

export const navigateToRegister = () => {
  return (dispatch, getState) => {

    navigationService.register();

  };
};

export const navigateToLogin = () => {
  return (dispatch, getState) => {

    navigationService.login();

  };
};

export const navigateToProfile = () => {
  return (dispatch, getState) => {

    navigationService.profile();

  };
};

export const navigateToMain = () => {
  return (dispatch, getState) => {

    navigationService.mainPage();

  };
};

export const headerLogout = () => {
  return (dispatch, getState) => {

    return dispatch(logout())
      .then(() => dispatch(getSubkleddits()))
      .then(() => dispatch(loadSubmissions()));

  };
};