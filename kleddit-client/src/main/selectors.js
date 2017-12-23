import {rootSelector} from '../state/utils';
import _ from 'lodash';
import { createSelector } from 'reselect';
import {getSubmissionMap} from '../submissions/selectors';

export const mainPageRoot = rootSelector('main');

export const isLeftSidebarShown = state => mainPageRoot(state).leftSidebarShown;

export const isFetching = state => mainPageRoot(state).fetchingActions > 0;

export const getErrorMessage = state => mainPageRoot(state).errorMessage;

export const getSubkleddits = (state) => mainPageRoot(state).subkleddits;
export const isFetchingNextPage = (state) => mainPageRoot(state).fetchingNextPage;
export const getCurrentPage = (state) => mainPageRoot(state).page;
export const getCurrentPerPage = (state) => mainPageRoot(state).perPage;
export const getSubmissionErrors = (state) => mainPageRoot(state).submissionErrors;
export const getShowReplies = (state) => mainPageRoot(state).showReplies;

export const getSubmissions = createSelector(
  [getSubmissionMap],
  (submissionMap) => {
    return Object.values(submissionMap).sort((a, b) => b.createdAt - a.createdAt);
  }
);
