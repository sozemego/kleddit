import { createSelector } from 'reselect';
import {rootSelector} from '../state/utils';
import { getShowingRepliesSubmissions } from '../main/selectors';

const submissionsRoot = rootSelector('submissions');

export const getSubmissionMap = (state) => submissionsRoot(state).submissions;
export const getReplies = (state) => submissionsRoot(state).replies;
export const getLoadingReplies = (state) => submissionsRoot(state).loadingReplies;

export const getSubmissionById = (state, submissionId) => {
  return getSubmissionMap(state)[submissionId];
};

export const isShowingReplies = (state, submissionId) => {
  return getShowingRepliesSubmissions(state)[submissionId];
};

export const getRepliesForSubmission = (state, submissionId) => {
  return getReplies(state)[submissionId] || [];
};

export const makeGetRepliesForMainPageSubmission = () => {
  return createSelector(
    [getRepliesForSubmission],
    (replies) => {
      return replies.slice(0, 15);
    }
  );
};



export const isLoadingReplies = (state, submissionId) => {
  return getLoadingReplies(state)[submissionId] || false;
};

export const getSubmissions = createSelector(
  [getSubmissionMap],
  (submissionMap) => {

    return Object.values(submissionMap).sort((a, b) => b.createdAt - a.createdAt);
  }
);
