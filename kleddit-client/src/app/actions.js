import { setSubscribedToSubkleddits } from '../user/state/actions';
import { setErrorMessage, setPage } from '../main/actions';
import { clearReplyState, clearSubmissions, } from '../submissions/actions';

/**
 This file contains actions that can be
 captured by many reducers. Or are spanning many different reducers (like clearing state on login/register).
 */


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