import { createSelector } from 'reselect';
import { rootSelector } from '../state/utils';
import { getMaxRepliesShown, getShowingRepliesSubmissions } from '../main/selectors';

const submissionsRoot = rootSelector('submissions');

export const getSubmissionMap = (state) => submissionsRoot(state).submissions;
export const getReplies = (state) => submissionsRoot(state).replies;
export const getLoadingReplies = (state) => submissionsRoot(state).loadingReplies;
export const getReplyCounts = (state) => submissionsRoot(state).replyCounts;
export const isPostingReply = (state) => submissionsRoot(state).isPostingReply;
export const getCurrentSubmissionId = (state) => submissionsRoot(state).currentSubmissionId;

export const getSubmissionById = (state, submissionId) => {
  return getSubmissionMap(state)[submissionId];
};

export const isShowingReplies = (state, submissionId) => {
  return getShowingRepliesSubmissions(state)[submissionId];
};

export const getRepliesForSubmission = (state, submissionId) => {
  return getReplies(state)[submissionId] || [];
};

export const getReplyCountForSubmission = (state, submissionId) => {
  return getReplyCounts(state)[submissionId] || 0;
};

export const makeGetRepliesForMainPageSubmission = () => {
  return createSelector(
    [getRepliesForSubmission, getMaxRepliesShown],
    (replies, maxReplyCount) => {
      return replies.slice(0, maxReplyCount);
    },
  );
};

export const isLoadingReplies = (state, submissionId) => {
  return getLoadingReplies(state)[submissionId] || false;
};

export const getSubmissions = createSelector(
  [getSubmissionMap],
  (submissionMap) => {

    return Object.values(submissionMap).sort((a, b) => b.createdAt - a.createdAt);
  },
);

export const getCurrentSubmission = (state) => {
  const submissionId = getCurrentSubmissionId(state);
  const submissionMap = getSubmissionMap(state);
  return submissionMap[submissionId];
};