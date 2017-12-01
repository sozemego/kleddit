import {rootSelector} from '../../state/utils';

export const subkledditRoot = rootSelector('subkleddits');

export const getDefaultSubkleddits = (state) => subkledditRoot(state).defaultSubkleddits;
export const getDefaultSubkledditNames = (state) => subkledditRoot(state).defaultSubkleddits.map(subkleddit => subkleddit.name);

export const getSubmissions = (state) => {
  const submissions = [...subkledditRoot(state).submissions];
  submissions.sort((a, b) => b.createdAt - a.createdAt);
  return submissions;
};