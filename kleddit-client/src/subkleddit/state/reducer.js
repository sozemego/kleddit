import _ from 'lodash';
import * as SUBKLEDDIT_ACTIONS from './actions';
import {createReducer} from '../../state/utils';

const emptySubmissionErrors = {
  title: null,
  content: null
};

const initialState = {

  subkleddits: [],
  page: 1,
  perPage: 15,
  submissions: [],
  submissionErrors: Object.assign({}, emptySubmissionErrors),
  isFetchingNextPage: false

};

const setSubkleddits = (state, action) => {
  return {...state, subkleddits: action.subkleddits}
};

const clearSubmissions = (state, action) => {
  return {...state, submissions: []};
};

const setSubmissions = (state, action) => {
  return {...state, submissions: action.submissions};
};

const addSubmissions = (state, action) => {
  const submissions = [...state.submissions];
  const nextSubmissions = _.uniqWith(submissions.concat(action.submissions), (s1, s2) => s1.submissionId === s2.submissionId);
  return {...state, submissions: nextSubmissions};
};

const setSubmissionErrors = (state, action) => {
  const submissionErrors = Object.assign({}, emptySubmissionErrors, action.submissionErrors);
  return {...state, submissionErrors};
};

const setPage = (state, action) => {
  return {...state, page: action.page};
};

const incrementPage = (state, action) => {
  let page = state.page;
  return {...state, page: ++page};
};

const fetchingNextPage = (state, action) => {
  return {...state, fetchingNextPage: action.bool};
};

const subkleddits = createReducer(initialState, {
  [SUBKLEDDIT_ACTIONS.SET_SUBKLEDDITS]: setSubkleddits,
  [SUBKLEDDIT_ACTIONS.CLEAR_SUBMISSIONS]: clearSubmissions,
  [SUBKLEDDIT_ACTIONS.ADD_SUBMISSIONS]: addSubmissions,
  [SUBKLEDDIT_ACTIONS.SET_SUBMISSIONS]: setSubmissions,
  [SUBKLEDDIT_ACTIONS.INCREMENT_PAGE]: incrementPage,
  [SUBKLEDDIT_ACTIONS.SET_PAGE]: setPage,
  [SUBKLEDDIT_ACTIONS.FETCHING_NEXT_PAGE]: fetchingNextPage,
  [SUBKLEDDIT_ACTIONS.SET_SUBMISSION_ERRORS]: setSubmissionErrors
});

export default subkleddits;