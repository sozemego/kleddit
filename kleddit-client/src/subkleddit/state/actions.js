import uuid from 'uuid/v4';
import _ from 'lodash';
import {SubkledditService as subkledditService} from '../SubkledditService';
import {makeActionCreator} from '../../state/utils';
import { setErrorMessage } from '../../main/state/actions';
import {getCurrentPage, getCurrentPerPage, isFetchingNextPage} from './selectors';

export const getSubkleddits = () => {
  return (dispatch, getState) => {

    return subkledditService.getSubkleddits()
      .then((subkleddits => dispatch(setSubkleddits(subkleddits))))
      .catch((error) => dispatch(setErrorMessage('Trouble getting subkleddits!')));
  };
};

export const submit = (subkleddit, title, content) => {
  return (dispatch, getState) => {

    if(typeof subkleddit !== 'string') {
      throw new Error('Subkleddit name has to be a string');
    }

    return subkledditService.submit(randomSubmissionId(), new Date().getTime(), subkleddit, title, content)
      .then(() => dispatch(loadSubmissions()))
      .then(() => dispatch(setSubmissionErrors({})))
      .catch(() => dispatch(setErrorMessage('Problem with submitting, please try again later.')));
  }
};

const randomSubmissionId = () => {
  return uuid().toString();
};

export const loadSubmissions = () => {
  return (dispatch, getState) => {

    return subkledditService.getSubmissionsForSubscribedSubkleddits()
      .then((submissions) => dispatch(setSubmissions(submissions)))
      .catch((error) => {
        if(_.get(error, 'response.status', 500) === 401) {
          return dispatch(setErrorMessage(`Problem fetching submissions, you are not logged in!`));
        }
        dispatch(setErrorMessage('Ops, had a problem fetching submissions!'));
      });

  };
};

export const deleteSubmission = (submissionId) => {
  return (dispatch, getState) => {

    if(!submissionId) {
      throw new Error('Needs to a defined submission id', submissionId);
    }

    return subkledditService.deleteSubmission(submissionId)
      .then(() => dispatch(loadSubmissions()));

  };
};

export const onScrollBottom = () => {
  return (dispatch, getState) => {

    if(isFetchingNextPage(getState)) {
      return Promise.resolve();
    }

    dispatch(incrementPage());
    dispatch(fetchingNextPage(true));
    const currentPage = getCurrentPage(getState);
    const currentPerPage = getCurrentPerPage(getState);
    console.log(currentPage);

    return subkledditService.getSubmissionsForSubscribedSubkleddits(currentPage, currentPerPage)
      .then((submissions) => {
        dispatch(addSubmissions(submissions));
        dispatch(fetchingNextPage(false));
      })
      .catch((error) => {
        if(_.get(error, 'response.status', 500) === 401) {
          return dispatch(setErrorMessage(`Problem fetching submissions, you are not logged in!`));
        }
        dispatch(setErrorMessage('Ops, had a problem fetching submissions!'));
        dispatch(fetchingNextPage(false));
      });

  };
};



export const SET_SUBKLEDDITS = 'SET_SUBKLEDDITS';
const setSubkleddits = makeActionCreator(SET_SUBKLEDDITS, 'subkleddits');

export const CLEAR_SUBMISSIONS = 'CLEAR_SUBMISSIONS';
export const clearSubmissions = makeActionCreator(CLEAR_SUBMISSIONS);

export const SET_SUBMISSIONS = 'SET_SUBMISSIONS';
export const setSubmissions = makeActionCreator(SET_SUBMISSIONS, 'submissions');

export const ADD_SUBMISSIONS = 'ADD_SUBMISSIONS';
export const addSubmissions = makeActionCreator(ADD_SUBMISSIONS, 'submissions');

export const FETCHING_NEXT_PAGE = 'FETCHING_NEXT_PAGE';
export const fetchingNextPage = makeActionCreator(FETCHING_NEXT_PAGE, 'bool');

export const SET_PAGE = 'SET_PAGE';
export const setPage = makeActionCreator(SET_PAGE, 'page');

export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const incrementPage = makeActionCreator(INCREMENT_PAGE);

export const VALIDATE_SUBMISSION = 'VALIDATE_SUBMISSION';
export const validateSubmission = makeActionCreator(VALIDATE_SUBMISSION, 'payload');

export const SET_SUBMISSION_ERRORS = 'SET_SUBMISSION_ERRORS';
export const setSubmissionErrors = makeActionCreator(SET_SUBMISSION_ERRORS, 'submissionErrors');