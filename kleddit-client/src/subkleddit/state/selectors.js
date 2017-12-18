import {rootSelector} from '../../state/utils';
import _ from 'lodash';
import { createSelector } from 'reselect';

export const subkledditRoot = rootSelector('subkleddits');

export const getSubkleddits = (state) => subkledditRoot(state).subkleddits;
export const isFetchingNextPage = (state) => subkledditRoot(state).fetchingNextPage;
export const getCurrentPage = (state) => subkledditRoot(state).page;
export const getCurrentPerPage = (state) => subkledditRoot(state).perPage;
export const getAllSubmissions = (state) => subkledditRoot(state).submissions;

export const getSubmissions = createSelector(
  [getAllSubmissions],
  ([...submissions]) => {
    submissions.sort((a, b) => b.createdAt - a.createdAt);
    console.log(submissions);
    return submissions.map(_.cloneDeep);
  }
);

export const getSubmissionErrors = (state) => subkledditRoot(state).submissionErrors;