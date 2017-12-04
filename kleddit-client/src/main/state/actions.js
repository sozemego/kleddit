import {
  getDefaultSubkleddits,
  loadSubmissions
} from '../../subkleddit/state/actions';

import {subscribe, unsubscribe} from '../../user/state/actions';

import {makeActionCreator} from '../../state/utils';

export const TOGGLE_LEFT_SIDEBAR_VISIBILITY = 'TOGGLE_LEFT_SIDEBAR_VISIBILITY';
export const toggleLeftSidebarVisibility = makeActionCreator(TOGGLE_LEFT_SIDEBAR_VISIBILITY);

export const init = () => {
  return (dispatch, getState) => {

    dispatch(getDefaultSubkleddits());
    dispatch(loadSubmissions());

  };
};

export const mainPageSubscribe = (subkleddit) => {
  return (dispatch, getState) => {

    return dispatch(subscribe(subkleddit))
      .then(() => dispatch(getDefaultSubkleddits()))
      .then(() => dispatch(loadSubmissions()));

  };
};

export const mainPageUnsubscribe = (subkleddit) => {
  return (dispatch, getState) => {

    return dispatch(unsubscribe(subkleddit))
      .then(() => dispatch(getDefaultSubkleddits()))
      .then(() => dispatch(loadSubmissions()));

  };
};
