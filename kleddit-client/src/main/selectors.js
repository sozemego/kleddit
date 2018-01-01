import { rootSelector } from '../state/utils';

export const mainPageRoot = rootSelector('main');

export const getSubkleddits = (state) => mainPageRoot(state).subkleddits;
export const isFetchingNextPage = (state) => mainPageRoot(state).fetchingNextPage;
export const getCurrentPage = (state) => mainPageRoot(state).page;
export const getCurrentPerPage = (state) => mainPageRoot(state).perPage;
export const getSubmissionErrors = (state) => mainPageRoot(state).submissionErrors;
export const getShowingRepliesSubmissions = (state) => mainPageRoot(state).showingReplies;
export const getMaxRepliesShown = (state) => mainPageRoot(state).maxRepliesShown;