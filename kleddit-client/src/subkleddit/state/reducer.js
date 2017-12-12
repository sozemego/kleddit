import * as SUBKLEDDIT_ACTIONS from './actions';
import {createReducer} from '../../state/utils';

const initialState = {

  subkleddits: [],
  submissions: [],
  deletingSubmissions: {

  }

};

const setSubkleddits = (state, action) => {
  return {...state, subkleddits: action.subkleddits}
};

const setSubmissions = (state, action) => {
  return {...state, submissions: action.submissions};
};

const markSubmissionDeleting = (state, action) => {
  const deletingSubmissions = [...state.deletingSubmissions];
  deletingSubmissions[action.submissionId] = true;
  return {...state, deletingSubmissions};
};

const subkleddits = createReducer(initialState, {
  [SUBKLEDDIT_ACTIONS.SET_SUBKLEDDITS]: setSubkleddits,
  [SUBKLEDDIT_ACTIONS.SET_SUBMISSIONS]: setSubmissions,
  [SUBKLEDDIT_ACTIONS.MARK_SUBMISSION_DELETING]: markSubmissionDeleting
});

export default subkleddits;