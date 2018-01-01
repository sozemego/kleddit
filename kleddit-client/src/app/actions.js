import { setSubscribedToSubkleddits } from '../user/state/actions';
import { setPage } from '../main/actions';
import { clearReplyState, clearSubmissions, } from '../submissions/actions';
import { makeActionCreator } from '../state/utils';

/**
 This file contains actions that can be
 captured by many reducers. Or are spanning many different reducers (like clearing state on login/register).
 */

export const FETCHING = 'FETCHING';
export const fetching = makeActionCreator(FETCHING);

export const STOP_FETCHING = 'STOP_FETCHING';
export const stopFetching = makeActionCreator(STOP_FETCHING);

export const SET_ERROR_MESSAGE = 'SET_ERROR_MESSAGE';
export const setErrorMessage = makeActionCreator(SET_ERROR_MESSAGE, 'error');

/**
 * A function to be fired after user logs out.
 * Same applies if the user registers (the previous one, if exists, has to be logged out).
 * @returns {function(*, *)}
 */
export const afterLogout = () => {
  return (dispatch, getState) => {

    dispatch(setSubscribedToSubkleddits([]));
    dispatch(setErrorMessage(null));
    dispatch(setPage(1));
    dispatch(clearSubmissions());
    dispatch(clearReplyState());

  };
};