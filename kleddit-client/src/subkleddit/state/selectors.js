import {rootSelector} from '../../state/utils';
import _ from 'lodash';

export const subkledditRoot = rootSelector('subkleddits');

export const getSubkleddits = (state) => subkledditRoot(state).subkleddits;
export const getSubkledditNames = (state) => subkledditRoot(state).subkleddits.map(subkleddit => subkleddit.name);

export const getSubmissions = (state) => {
  const submissions = [...subkledditRoot(state).submissions];
  submissions.sort((a, b) => b.createdAt - a.createdAt);
  return submissions.map(submission => _.cloneDeep(submission));
};

export const getSubmissionErrors = (state) => subkledditRoot(state).submissionErrors;