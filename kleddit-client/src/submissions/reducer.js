import _ from 'lodash';
import {createReducer} from '../state/utils';
import * as SUBMISSIONS_ACTIONS from './actions';

const initialState = {
  submissions: {

  },
  replies: {

  },
  loadingReplies: {

  },
};

const clearSubmissions = (state, action) => {
  return {...state, submissions: {}};
};

const addSubmissions = (state, action) => {
  const submissions = Object.assign({}, _.get(state, 'submissions', {}), _.keyBy(action.submissions, 'submissionId'));
  return {...state, submissions};
};

const deleteSubmission = (state, action) => {
  const submissions = {...state.submissions};
  delete submissions[action.submissionId];
  return {...state, submissions};
};

const deleteSubmissionsBySubkleddit = (state, action) => {
  const {subkleddit} = action;
  const submissions = {...state.submissions};
  const submissionIdsToRemove = _.values(submissions)
    .filter(submission => submission.subkleddit = subkleddit)
    .map(submission => submission.submissionId);

  submissionIdsToRemove.forEach(id => {
    _.unset(submissions, `[${id}]`);
  });

  return {...state, submissions};
};

const addRepliesForSubmissionId = (state, action) => {
  const {submissionId, replies: submissionReplies} = action;

  const replies = {...state.replies};
  const oldSubmissionReplies = _.get(replies, `[${submissionId}]`, []);
  replies[submissionId] = _.unionBy(oldSubmissionReplies, submissionReplies, 'replyId')
    .sort((a, b) => b.createdAt - a.createdAt);
  return {...state, replies};
};

const setLoadingRepliesForSubmission = (state, action) => {
  const {submissionId, bool} = action;

  const loadingReplies = {...state.loadingReplies};
  loadingReplies[submissionId] = bool;
  return {...state, loadingReplies};
};

const clearReplyState = (state, action) => {
  return {...state, replies: {}, loadingReplies: {}};
};

const submissions = createReducer(initialState, {
  [SUBMISSIONS_ACTIONS.CLEAR_SUBMISSIONS]: clearSubmissions,
  [SUBMISSIONS_ACTIONS.ADD_SUBMISSIONS]: addSubmissions,
  [SUBMISSIONS_ACTIONS.DELETE_SUBMISSION]: deleteSubmission,
  [SUBMISSIONS_ACTIONS.DELETE_SUBMISSIONS_BY_SUBKLEDDIT]: deleteSubmissionsBySubkleddit,
  [SUBMISSIONS_ACTIONS.ADD_REPLIES_FOR_SUBMISSION_ID]: addRepliesForSubmissionId,
  [SUBMISSIONS_ACTIONS.SET_LOADING_REPLIES_FOR_SUBMISSION]: setLoadingRepliesForSubmission,
  [SUBMISSIONS_ACTIONS.CLEAR_REPLY_STATE]: clearReplyState,
});

export default submissions;