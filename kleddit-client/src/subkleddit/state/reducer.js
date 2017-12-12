import _ from 'lodash';
import * as SUBKLEDDIT_ACTIONS from './actions';
import {createReducer} from '../../state/utils';

const emptySubmissionErrors = {
  title: null,
  content: null
};

const initialState = {

  subkleddits: [],
  submissions: [],
  submissionErrors: Object.assign({}, emptySubmissionErrors)

};

const setSubkleddits = (state, action) => {
  return {...state, subkleddits: action.subkleddits}
};

const setSubmissions = (state, action) => {
  return {...state, submissions: action.submissions};
};

const setSubmissionErrors = (state, action) => {
  const submissionErrors = Object.assign({}, emptySubmissionErrors, action.submissionErrors);
  return {...state, submissionErrors};
};

const subkleddits = createReducer(initialState, {
  [SUBKLEDDIT_ACTIONS.SET_SUBKLEDDITS]: setSubkleddits,
  [SUBKLEDDIT_ACTIONS.SET_SUBMISSIONS]: setSubmissions,
  [SUBKLEDDIT_ACTIONS.SET_SUBMISSION_ERRORS]: setSubmissionErrors
});

export default subkleddits;