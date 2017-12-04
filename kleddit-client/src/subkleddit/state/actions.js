import uuid from 'uuid/v4';
import {SubkledditService as subkledditService} from '../SubkledditService';
import {makeActionCreator} from '../../state/utils';
import {fetching, stopFetching} from '../../main/state/actions';

export const getSubkleddits = () => {
  return (dispatch, getState) => {

    dispatch(fetching());
    return subkledditService.getSubkleddits()
      .then((subkleddits => dispatch(setSubkleddits(subkleddits))))
      .then(() => dispatch(stopFetching()));
  };
};

export const submit = (subkleddit, title, content) => {
  return (dispatch, getState) => {

    if(typeof subkleddit !== 'string') {
      throw new Error("Subkleddit name has to be a string");
    }

    dispatch(fetching());
    return subkledditService.submit(randomSubmissionId(), new Date().getTime(), subkleddit, title, content)
      .then(() => dispatch(loadSubmissions()))
      .then(() => dispatch(stopFetching()));
  }
};

const randomSubmissionId = () => {
  return uuid().toString();
};

export const loadSubmissions = () => {
  return (dispatch, getState) => {

    dispatch(fetching());
    return subkledditService.getSubmissionsForSubscribedSubkleddits()
      .then((submissions) => dispatch(setSubmissions(submissions)))
      .then(() => dispatch(stopFetching()));

  };
};

export const SET_SUBKLEDDITS = 'SET_SUBKLEDDITS';
const setSubkleddits = makeActionCreator(SET_SUBKLEDDITS, 'subkleddits');

export const SET_SUBMISSIONS = 'SET_SUBMISSIONS';
const setSubmissions = makeActionCreator(SET_SUBMISSIONS, 'submissions');