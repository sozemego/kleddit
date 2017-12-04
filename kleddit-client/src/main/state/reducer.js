import {createReducer} from '../../state/utils';
import * as MAIN_ACTIONS from './actions';

const initialState = {
  leftSidebarShown: true,
  fetchingActions: 0,
};

const toggleLeftSidebarVisibility = (state, action) => {
  return {...state, leftSidebarShown: !state.leftSidebarShown};
};

const fetching = (state, action) => {
  return {...state, fetchingActions: ++state.fetchingActions};
};

const stopFetching = (state, action) => {
  return {...state, fetchingActions: --state.fetchingActions};
};

const main = createReducer(initialState, {
  [MAIN_ACTIONS.TOGGLE_LEFT_SIDEBAR_VISIBILITY]: toggleLeftSidebarVisibility,
  [MAIN_ACTIONS.FETCHING]: fetching,
  [MAIN_ACTIONS.STOP_FETCHING]: stopFetching
});

export default main;