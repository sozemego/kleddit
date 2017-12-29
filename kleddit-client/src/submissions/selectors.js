import {rootSelector} from '../state/utils';

const submissionsRoot = rootSelector('submissions');

export const getSubmissionMap = (state) => submissionsRoot(state).submissions;
export const getReplies = (state) => submissionsRoot(state).replies;
export const getLoadingReplies = (state) => submissionsRoot(state).loadingReplies;