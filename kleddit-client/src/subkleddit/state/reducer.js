import * as SUBKLEDDIT_ACTIONS from './actions';
import {createReducer} from '../../state/utils';

const initialState = {

  subkleddits: [],
  submissions: []

};

const setSubkleddits = (state, action) => {
  return {...state, subkleddits: action.subkleddits}
};

const setSubmissions = (state, action) => {
  return {...state, submissions: action.submissions};
};

const subkleddits = createReducer(initialState, {
  [SUBKLEDDIT_ACTIONS.SET_SUBKLEDDITS]: setSubkleddits,
  [SUBKLEDDIT_ACTIONS.SET_SUBMISSIONS]: setSubmissions
});

export default subkleddits;