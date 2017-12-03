import {createReducer} from '../../state/utils';
import * as MAIN_ACTIONS from './actions';

const initialState = {
  leftSidebarShown: true
};

const toggleLeftSidebarVisibility = (state, action) => {
  return {...state, leftSidebarShown: !state.leftSidebarShown};
};

const main = createReducer(initialState, {
  [MAIN_ACTIONS.TOGGLE_LEFT_SIDEBAR_VISIBILITY]: toggleLeftSidebarVisibility
});

export default main;