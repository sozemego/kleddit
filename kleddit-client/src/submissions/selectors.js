import {rootSelector} from '../state/utils';

const submissionsRoot = rootSelector('submissions');

export const getSubmissionMap = (state) => submissionsRoot(state).submissions;
export const getReplies = (state) => submissionsRoot(state).replies;
export const getLoadingReplies = (state) => submissionsRoot(state).loadingReplies;
export const getInputReplies = (state) => submissionsRoot(state).inputReplies;
export const getInputReplyErrors = (state) => submissionsRoot(state).inputReplyErrors;