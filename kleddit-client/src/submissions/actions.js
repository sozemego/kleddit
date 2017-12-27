import _ from 'lodash';

import {makeActionCreator} from '../state/utils';
import {setErrorMessage} from '../main/actions';
import {SubkledditService as subkledditService} from '../subkleddit/SubkledditService';
import {SubmissionService as submissionService} from './SubmissionService';

export const CLEAR_SUBMISSIONS = 'CLEAR_SUBMISSIONS';
export const clearSubmissions = makeActionCreator(CLEAR_SUBMISSIONS);

export const ADD_SUBMISSIONS = 'ADD_SUBMISSIONS';
const addSubmissions = makeActionCreator(ADD_SUBMISSIONS, 'submissions');

export const DELETE_SUBMISSION = 'DELETE_SUBMISSION';
const _deleteSubmission = makeActionCreator(DELETE_SUBMISSION, 'submissionId');

export const loadSubmissions = (page, limit) => {
  return (dispatch, getState) => {

    return subkledditService.getSubmissionsForSubscribedSubkleddits(page, limit)
      .then((submissions) => {
        dispatch(addSubmissions(submissions));
      })
      .catch((error) => {
        if(_.get(error, 'response.status', 500) === 401) {
          return dispatch(setErrorMessage(`Problem fetching submissions, you are not logged in!`));
        }
        dispatch(setErrorMessage('Ops, had a problem fetching submissions!'));
      })

  };
};

export const deleteSubmission = (submissionId) => {
  return (dispatch, getState) => {

    if(!submissionId) {
      throw new Error(`Needs to a defined submission id ${submissionId}`);
    }

    return subkledditService.deleteSubmission(submissionId)
      .then(() => dispatch(_deleteSubmission(submissionId)));

  };
};

export const getReplies = (submissionId, page, limit) => {
  return (dispatch, getState) => {

    return submissionService.getReplies(submissionId, page, limit);

  };
};