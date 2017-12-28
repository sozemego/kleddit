import _ from 'lodash';
import {createReducer} from '../state/utils';
import * as MAIN_ACTIONS from './actions';

const emptySubmissionErrors = {
  title: null,
  content: null
};

const initialState = {
  leftSidebarShown: true,
  fetchingActions: 0,
  errorMessage: "",
  page: 1,
  perPage: 15,
  subkleddits: [],
  submissionErrors: Object.assign({}, emptySubmissionErrors),
  showingReplies: {

  },
  isFetchingNextPage: false
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

const setSubkleddits = (state, action) => {
  return {...state, subkleddits: action.subkleddits}
};

const setSubmissionErrors = (state, action) => {
  const submissionErrors = Object.assign({}, emptySubmissionErrors, action.submissionErrors);
  return {...state, submissionErrors};
};

const toggleShowingReplies = (state, action) => {
  const { submissionId } = action;
  const showingReplies = {...state.showingReplies};
  const showingRepliesSubmission = _.get(showingReplies, `[${submissionId}]`, false);
  if(showingRepliesSubmission) {
    delete showingReplies[submissionId];
  } else {
    showingReplies[submissionId] = true;
  }
  return {...state, showingReplies};
};

const main = createReducer(initialState, {
  [MAIN_ACTIONS.TOGGLE_LEFT_SIDEBAR_VISIBILITY]: toggleLeftSidebarVisibility,
  [MAIN_ACTIONS.FETCHING]: fetching,
  [MAIN_ACTIONS.STOP_FETCHING]: stopFetching,
  [MAIN_ACTIONS.SET_ERROR_MESSAGE]: setErrorMessage,
  [MAIN_ACTIONS.INCREMENT_PAGE]: incrementPage,
  [MAIN_ACTIONS.SET_PAGE]: setPage,
  [MAIN_ACTIONS.FETCHING_NEXT_PAGE]: fetchingNextPage,
  [MAIN_ACTIONS.SET_SUBKLEDDITS]: setSubkleddits,
  [MAIN_ACTIONS.SET_SUBMISSION_ERRORS]: setSubmissionErrors,
  [MAIN_ACTIONS.TOGGLE_SHOWING_REPLIES]: toggleShowingReplies,
});

export default main;