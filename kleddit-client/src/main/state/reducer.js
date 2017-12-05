import {createReducer} from '../../state/utils';
import * as MAIN_ACTIONS from './actions';

const initialState = {
  leftSidebarShown: true,
  fetchingActions: 0,
  errorMessage: ""
};

const toggleLeftSidebarVisibility = (state, action) => {
  return {...state, leftSidebarShown: !state.leftSidebarShown};
};

const fetching = (state, action) => {
  let fetchingActions = state.fetchingActions;
  return {...state, fetchingActions: ++fetchingActions};
};

const stopFetching = (state, action) => {
  let fetchingActions = state.fetchingActions;
  return {...state, fetchingActions: --fetchingActions};
};

const setErrorMessage = (state, action) => {
  return {...state, errorMessage: action.error};
};

const main = createReducer(initialState, {
  [MAIN_ACTIONS.TOGGLE_LEFT_SIDEBAR_VISIBILITY]: toggleLeftSidebarVisibility,
  [MAIN_ACTIONS.FETCHING]: fetching,
  [MAIN_ACTIONS.STOP_FETCHING]: stopFetching,
  [MAIN_ACTIONS.SET_ERROR_MESSAGE]: setErrorMessage
});

export default main;