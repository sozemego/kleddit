import _ from 'lodash';
import { makeActionCreator } from '../state/utils';

import { subscribe, unsubscribe } from '../user/state/actions';

import * as submissionsActions from '../submissions/actions';
import {
  addReply, deleteSubmissionsBySubkleddit, getReplies, onStartTyping,
  onStopTyping,
} from '../submissions/actions';
import { SubkledditService as subkledditService } from '../subkleddit/SubkledditService';
import { getCurrentPage, getCurrentPerPage, getShowingRepliesSubmissions, isFetchingNextPage } from './selectors';
import { getSubmissions } from '../submissions/selectors';
import { setErrorMessage } from '../app/actions';
import { ReplyTypingService as replyTypingService } from '../submissions/ReplyTypingService';

export const SET_SUBKLEDDITS = 'SET_SUBKLEDDITS';
const setSubkleddits = makeActionCreator(SET_SUBKLEDDITS, 'subkleddits');

export const FETCHING_NEXT_PAGE = 'FETCHING_NEXT_PAGE';
export const fetchingNextPage = makeActionCreator(FETCHING_NEXT_PAGE, 'bool');

export const SET_PAGE = 'SET_PAGE';
export const setPage = makeActionCreator(SET_PAGE, 'page');

export const INCREMENT_PAGE = 'INCREMENT_PAGE';
export const incrementPage = makeActionCreator(INCREMENT_PAGE);

export const SET_SUBMISSION_ERRORS = 'SET_SUBMISSION_ERRORS';
export const setSubmissionErrors = makeActionCreator(SET_SUBMISSION_ERRORS, 'submissionErrors');

export const TOGGLE_SHOWING_REPLIES = 'TOGGLE_SHOWING_REPLIES';
export const _toggleShowingReplies = makeActionCreator(TOGGLE_SHOWING_REPLIES, 'submissionId');

export const CLEAR_REPLY_STATE = 'CLEAR_REPLY_STATE';
export const clearReplyState = makeActionCreator(CLEAR_REPLY_STATE);

export const init = () => {
  return (dispatch, getState) => {

    replyTypingService.connect();
    replyTypingService.setOnStartTyping((submissionId) => dispatch(onStartTyping(submissionId)));
    replyTypingService.setOnStopTyping((submissionId) => dispatch(onStopTyping(submissionId)));
    replyTypingService.setOnReply((reply) => dispatch(addReply(reply)));

    dispatch(getSubkleddits());
    dispatch(loadSubmissions());

  };
};

export const mainPageSubscribe = (subkleddit) => {
  return (dispatch, getState) => {

    return dispatch(subscribe(subkleddit))
      .then(() => dispatch(getSubkleddits()))
      .then(() => dispatch(loadSubmissions()))
      .catch(_.noop);

  };
};

export const mainPageUnsubscribe = (subkleddit) => {
  return (dispatch, getState) => {

    dispatch(deleteSubmissionsBySubkleddit(subkleddit));

    return dispatch(unsubscribe(subkleddit))
      .then(() => dispatch(getSubkleddits()))
      .then(() => dispatch(loadSubmissions()))
      .catch(_.noop);

  };
};

export const getSubkleddits = () => {
  return (dispatch, getState) => {

    return subkledditService.getSubkleddits()
      .then((subkleddits => dispatch(setSubkleddits(subkleddits))))
      .catch((error) => dispatch(setErrorMessage('Trouble getting subkleddits!')));
  };
};

export const submit = (subkleddit, title, content) => {
  return (dispatch, getState) => {

    if (typeof subkleddit !== 'string') {
      throw new Error('Subkleddit name has to be a string');
    }

    return dispatch(submissionsActions.submit(subkleddit, title, content))
      .then(() => dispatch(loadSubmissions()))
      .then(() => dispatch(setSubmissionErrors({})));
  };
};

export const loadSubmissions = () => {
  return (dispatch, getState) => {

    dispatch(fetchingNextPage(true));
    dispatch(setPage(1));

    return dispatch(submissionsActions.loadSubmissions())
      .catch((error) => {
        const status = _.get(error, `status`, 500);
        if (status === 401) {
          return dispatch(setErrorMessage(`Problem fetching submissions, you are not logged in!`));
        }
        if(status === 429) {
          return;
        }
        dispatch(setErrorMessage('Ops, had a problem fetching submissions!'));
      })
      .then(() => {
        setTimeout(() => {
          dispatch(fetchingNextPage(false));
        }, 25);
      });

  };
};

export const onScrollBottom = () => {
  return (dispatch, getState) => {

    if (isFetchingNextPage(getState) || getSubmissions(getState).length === 0) {
      return Promise.resolve();
    }

    dispatch(incrementPage());
    dispatch(fetchingNextPage(true));
    const currentPage = getCurrentPage(getState);
    const currentPerPage = getCurrentPerPage(getState);

    return dispatch(submissionsActions.loadSubmissions(currentPage, currentPerPage))
      .catch((error) => {
        const status = _.get(error, `status`, 500);
        if (status === 401) {
          return dispatch(setErrorMessage(`Problem fetching submissions, you are not logged in!`));
        }
        if(status === 429) {
          return;
        }
        dispatch(setErrorMessage('Ops, had a problem fetching submissions!'));
      })
      .then(() => {
        dispatch(fetchingNextPage(false));
      });

  };
};

export const toggleShowReplies = (submissionId) => {
  return (dispatch, getState) => {

    dispatch(_toggleShowingReplies(submissionId));

    const shouldShowReplies = getShowingRepliesSubmissions(getState)[submissionId] || false;

    if(shouldShowReplies) {
      replyTypingService.register(submissionId);
    } else {
      replyTypingService.unregister(submissionId);
    }

    if (shouldShowReplies) {
      return dispatch(getReplies(submissionId, 1, 15));
    }

    return Promise.resolve();
  };
};

