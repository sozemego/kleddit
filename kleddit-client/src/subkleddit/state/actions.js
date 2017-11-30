import uuid from 'uuid/v4';
import {SubkledditService as subkledditService} from '../SubkledditService';
import {makeActionCreator} from '../../state/utils';
import {getSubscribedToSubkleddits} from '../../user/state/selectors';

export const getDefaultSubkleddits = () => {
  return (dispatch, getState) => {

    return subkledditService.getDefaultSubkleddits()
      .then((subkleddits => dispatch(setDefaultSubkleddits(subkleddits))));

  };
};

export const submit = (subkleddit, title, content) => {
  return (dispatch, getState) => {

    if(typeof subkleddit !== 'string') {
      throw new Error("");
    }

    return subkledditService.submit(randomSubmissionId(), new Date().getTime(), subkleddit, title, content)
      .then(() => dispatch(loadSubmissions()));
  }
};

const randomSubmissionId = () => {
  return uuid().toString();
};

export const loadSubmissions = () => {
  return (dispatch, getState) => {

    return subkledditService.getSubmissionsForSubscribedSubkleddits()
      .then((submissions) => dispatch(setSubmissions(submissions)));

  };
};

export const SET_DEFAULT_SUBKLEDDITS = 'SET_DEFAULT_SUBKLEDDITS';
const setDefaultSubkleddits = makeActionCreator(SET_DEFAULT_SUBKLEDDITS, 'subkleddits');

export const SET_SUBMISSIONS = 'SET_SUBMISSIONS';
const setSubmissions = makeActionCreator(SET_SUBMISSIONS, 'submissions');