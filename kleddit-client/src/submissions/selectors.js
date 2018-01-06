import { createSelector } from 'reselect';
import { rootSelector } from '../state/utils';
import { getMaxRepliesShown, getShowingRepliesSubmissions } from '../main/selectors';

const submissionsRoot = rootSelector('submissions');

export const getSubmissionMap = (state) => submissionsRoot(state).submissions;
export const getReplies = (state) => submissionsRoot(state).replies;
export const getLoadingReplies = (state) => submissionsRoot(state).loadingReplies;
export const getReplyCounts = (state) => submissionsRoot(state).replyCounts;
export const isPostingReply = (state) => submissionsRoot(state).isPostingReply;
export const getCurrentSubmission = (state) => submissionsRoot(state).currentSubmission;

export const isFetchingNextReplyPage = (state) => submissionsRoot(state).isFetchingNextReplyPage;
export const getCurrentReplyPage = (state) => submissionsRoot(state).currentSubmissionReplyPage;
export const getRepliesPerPage = (state) => submissionsRoot(state).repliesPerPage;

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

export const getCurrentSubmissionReplies = createSelector(
  getCurrentSubmission, getReplies,
  (submission, replies) => {
    if(!submission) return [];
    return replies[submission.submissionId] || [];
  }
);

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