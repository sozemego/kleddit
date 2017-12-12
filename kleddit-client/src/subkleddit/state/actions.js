import uuid from 'uuid/v4';
import _ from 'lodash';
import {SubkledditService as subkledditService} from '../SubkledditService';
import {makeActionCreator} from '../../state/utils';
import {fetching, setErrorMessage, stopFetching} from '../../main/state/actions';

export const getSubkleddits = () => {
  return (dispatch, getState) => {

    dispatch(fetching());
    return subkledditService.getSubkleddits()
      .then((subkleddits => dispatch(setSubkleddits(subkleddits))))
      .then(() => dispatch(stopFetching()))
      .catch((error) => dispatch(setErrorMessage('Trouble getting subkleddits!')));
  };
};

export const submit = (subkleddit, title, content) => {
  return (dispatch, getState) => {

    if(typeof subkleddit !== 'string') {
      throw new Error('Subkleddit name has to be a string');
    }

    dispatch(fetching());
    return subkledditService.submit(randomSubmissionId(), new Date().getTime(), subkleddit, title, content)
      .then(() => dispatch(loadSubmissions()))
      .then(() => dispatch(setSubmissionErrors({})))
      .then(() => dispatch(stopFetching()))
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

export const SET_SUBKLEDDITS = 'SET_SUBKLEDDITS';
const setSubkleddits = makeActionCreator(SET_SUBKLEDDITS, 'subkleddits');

export const SET_SUBMISSIONS = 'SET_SUBMISSIONS';
const setSubmissions = makeActionCreator(SET_SUBMISSIONS, 'submissions');

export const MARK_SUBMISSION_DELETING = 'MARK_SUBMISSION_DELETING';
export const markSubmissionDeleting = makeActionCreator(MARK_SUBMISSION_DELETING, 'submissionId');

export const VALIDATE_SUBMISSION = 'VALIDATE_SUBMISSION';
export const validateSubmission = makeActionCreator(VALIDATE_SUBMISSION, 'payload');

export const SET_SUBMISSION_ERRORS = 'SET_SUBMISSION_ERRORS';
export const setSubmissionErrors = makeActionCreator(SET_SUBMISSION_ERRORS, 'submissionErrors');