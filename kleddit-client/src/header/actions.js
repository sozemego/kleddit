import {NavigationService as navigationService} from '../navigation/NavigationService';

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