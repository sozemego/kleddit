import {
  getSubkleddits,
  loadSubmissions
} from '../../subkleddit/state/actions';

import {subscribe, unsubscribe} from '../../user/state/actions';

import {makeActionCreator} from '../../state/utils';

export const TOGGLE_LEFT_SIDEBAR_VISIBILITY = 'TOGGLE_LEFT_SIDEBAR_VISIBILITY';
export const toggleLeftSidebarVisibility = makeActionCreator(TOGGLE_LEFT_SIDEBAR_VISIBILITY);

export const FETCHING = 'FETCHING';
export const fetching = makeActionCreator(FETCHING);

export const STOP_FETCHING = 'STOP_FETCHING';
export const stopFetching = makeActionCreator(STOP_FETCHING);

export const init = () => {
  return (dispatch, getState) => {

    dispatch(getSubkleddits());
    dispatch(loadSubmissions());

  };
};

export const mainPageSubscribe = (subkleddit) => {
  return (dispatch, getState) => {

    return dispatch(subscribe(subkleddit))
      .then(() => dispatch(getSubkleddits()))
      .then(() => dispatch(loadSubmissions()));

  };
};

export const mainPageUnsubscribe = (subkleddit) => {
  return (dispatch, getState) => {

    return dispatch(unsubscribe(subkleddit))
      .then(() => dispatch(getSubkleddits()))
      .then(() => dispatch(loadSubmissions()));

  };
};
