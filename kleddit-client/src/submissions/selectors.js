import {rootSelector} from '../state/utils';

const submissionsRoot = rootSelector('submissions');

export const getSubmissionMap = (state) => submissionsRoot(state).submissions;