import {
  getDefaultSubkleddits,
  loadSubmissions
} from '../../subkleddit/state/actions';
import {makeActionCreator} from '../../state/utils';

export const TOGGLE_LEFT_SIDEBAR_VISIBILITY = 'TOGGLE_LEFT_SIDEBAR_VISIBILITY';
export const toggleLeftSidebarVisibility = makeActionCreator(TOGGLE_LEFT_SIDEBAR_VISIBILITY);

export const init = () => {
  return (dispatch, getState) => {

    dispatch(getDefaultSubkleddits());
    dispatch(loadSubmissions());

  };
};
