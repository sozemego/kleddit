import _ from 'lodash';

import { makeActionCreator } from '../state/utils';
import { setSubmissionErrors } from '../main/actions';
import { SubmissionService as submissionService } from './SubmissionService';
import {
  getCurrentReplyPage,
  getCurrentSubmission,
  getRepliesPerPage,
  isFetchingNextReplyPage,
  isPostingReply,
} from './selectors';
import { getUsername } from '../user/state/selectors';
import { setErrorMessage } from '../app/actions';
import { ReplyTypingService as replyTypingService } from './ReplyTypingService';

export const CLEAR_SUBMISSIONS = 'CLEAR_SUBMISSIONS';
export const clearSubmissions = makeActionCreator(CLEAR_SUBMISSIONS);

export const ADD_SUBMISSIONS = 'ADD_SUBMISSIONS';
const addSubmissions = makeActionCreator(ADD_SUBMISSIONS, 'submissions');

export const DELETE_SUBMISSION = 'DELETE_SUBMISSION';
const _deleteSubmission = makeActionCreator(DELETE_SUBMISSION, 'submissionId');

export const DELETE_SUBMISSIONS_BY_SUBKLEDDIT = 'DELETE_SUBMISSIONS_BY_SUBKLEDDIT';
export const deleteSubmissionsBySubkleddit = makeActionCreator(DELETE_SUBMISSIONS_BY_SUBKLEDDIT, 'subkleddit');

export const ADD_REPLIES_FOR_SUBMISSION_ID = 'ADD_REPLIES_FOR_SUBMISSION_ID';
export const addRepliesForSubmissionId = makeActionCreator(ADD_REPLIES_FOR_SUBMISSION_ID, 'submissionId', 'replies');

export const SET_LOADING_REPLIES_FOR_SUBMISSION = 'SET_LOADING_REPLIES_FOR_SUBMISSION';
export const setLoadingRepliesForSubmission = makeActionCreator(SET_LOADING_REPLIES_FOR_SUBMISSION, 'submissionId', 'bool');

export const SET_INPUT_REPLY_FOR_SUBMISSION = 'SET_INPUT_REPLY_FOR_SUBMISSION';
export const setInputReplyForSubmission = makeActionCreator(SET_INPUT_REPLY_FOR_SUBMISSION, 'submissionId', 'content');

export const CLEAR_REPLY_STATE = 'CLEAR_REPLY_STATE';
export const clearReplyState = makeActionCreator(CLEAR_REPLY_STATE);

export const INCREMENT_REPLY_COUNT = 'INCREMENT_REPLY_COUNT';
export const incrementReplyCount = makeActionCreator(INCREMENT_REPLY_COUNT, 'submissionId');

export const SET_IS_POSTING_REPLY = 'SET_IS_POSTING_REPLY';
export const setIsPostingReply = makeActionCreator(SET_IS_POSTING_REPLY, 'bool');

export const SET_CURRENT_SUBMISSION = 'SET_CURRENT_SUBMISSION';
export const setCurrentSubmission = makeActionCreator(SET_CURRENT_SUBMISSION, 'submission');

export const INCREMENT_REPLY_PAGE = 'INCREMENT_REPLY_PAGE';
export const incrementReplyPage = makeActionCreator(INCREMENT_REPLY_PAGE);

export const SET_REPLY_PAGE = 'SET_REPLY_PAGE';
export const setReplyPage = makeActionCreator(SET_REPLY_PAGE, 'page');

export const FETCHING_NEXT_REPLY_PAGE = 'FETCHING_NEXT_REPLY_PAGE';
export const fetchingNextReplyPage = makeActionCreator(FETCHING_NEXT_REPLY_PAGE, 'bool');

export const ADD_SUBMISSION_ID_REPLY_TYPED = 'ADD_SUBMISSION_ID_REPLY_TYPED';
export const addSubmissionIdReplyTyped = makeActionCreator(ADD_SUBMISSION_ID_REPLY_TYPED, 'submissionId');

export const REMOVE_SUBMISSION_ID_REPLY_TYPED = 'REMOVE_SUBMISSION_ID_REPLY_TYPED';
export const removeSubmissionIdReplyTyped = makeActionCreator(REMOVE_SUBMISSION_ID_REPLY_TYPED, 'submissionId');

export const loadSubmissions = (page, limit) => {
  return (dispatch, getState) => {

    const username = getUsername(getState);

    return submissionService.getSubmissionsForSubscribedSubkleddits(page, limit)
      .then((submissions) => {
        submissions = submissions.map(submission => {
          submission.own = submission.author === username;
          return submission;
        });
        dispatch(addSubmissions(submissions));
      })
      .catch((error) => {
        if (_.get(error, 'response.status', 500) === 401) {
          return dispatch(setErrorMessage(`Problem fetching submissions, you are not logged in!`));
        }
        dispatch(setErrorMessage('Ops, had a problem fetching submissions!'));
      });

  };
};

export const submit = (subkleddit, title, content) => {
  return (dispatch, getState) => {

    if (typeof subkleddit !== 'string') {
      throw new Error('Subkleddit name has to be a string');
    }

    return submissionService.submit(subkleddit, title, content)
      .catch(() => dispatch(setErrorMessage('Problem with submitting, please try again later.')));
  };
};

export const deleteSubmission = (submissionId) => {
  return (dispatch, getState) => {

    if (!submissionId) {
      throw new Error(`Needs to pass a defined submission id ${submissionId}`);
    }

    return submissionService.deleteSubmission(submissionId)
      .then(() => dispatch(_deleteSubmission(submissionId)));

  };
};

export const getReplies = (submissionId, page, limit) => {
  return (dispatch, getState) => {

    dispatch(setLoadingRepliesForSubmission(submissionId, true));
    return submissionService.getReplies(submissionId, page, limit)
      .then(replies => dispatch(addRepliesForSubmissionId(submissionId, replies)))
      .catch(err => {
        console.warn(err);
        dispatch(setErrorMessage(`Problem with fetching replies!`));
      })
      .then(() => {
        dispatch(setLoadingRepliesForSubmission(submissionId, false));
      });

  };
};

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 10000;

export const validateSubmission = ({ title, content }) => {
  return (dispatch, getState) => {

    const error = {
      title: null,
      content: null,
    };

    if (title.length === 0) {
      error.title = 'Title is too short!';
    }
    if (title.length > MAX_TITLE_LENGTH) {
      error.title = `Title is too long, it cannot be longer than ${MAX_TITLE_LENGTH}`;
    }

    if (content.length === 0) {
      error.content = 'Content is too short!';
    }
    if (content.length > MAX_CONTENT_LENGTH) {
      error.title = `Content is too long, it cannot be longer than ${MAX_CONTENT_LENGTH}`;
    }

    dispatch(setSubmissionErrors(error));

  };
};

const MAX_REPLY_CONTENT_LENGTH = 10000;

export const onReplySubmit = (submissionId, replyText) => {
  return (dispatch, getState) => {

    if (replyText && replyText.trim() && replyText.length < MAX_REPLY_CONTENT_LENGTH) {
      return dispatch(postReply(submissionId, replyText.trim()));
    }

    return Promise.resolve();
  };
};

export const postReply = (submissionId, content) => {
  return (dispatch, getState) => {

    if (isPostingReply(getState)) {
      return Promise.resolve(content);
    }

    dispatch(setIsPostingReply(true));

    replyTypingService.stopTyping(submissionId);
    return submissionService.postReply(submissionId, content)
      .then((reply) => {
        dispatch(addRepliesForSubmissionId(submissionId, [reply]));
        dispatch(setInputReplyForSubmission(submissionId, ''));
        dispatch(incrementReplyCount(submissionId));
        dispatch(setIsPostingReply(false));
      });
  };
};

export const fetchCurrentSubmission = (submissionId) => {
  return (dispatch, getState) => {

    dispatch(fetchingNextReplyPage(true));
    dispatch(setReplyPage(1));

    return Promise.all([
      submissionService.getSubmissionById(submissionId),
      dispatch(getReplies(submissionId, 1, getRepliesPerPage(getState))),
    ])
      .then(([submission]) => {
        dispatch(setCurrentSubmission(submission));
        dispatch(fetchingNextReplyPage(false));
      });
  };
};

export const onScrollBottom = () => {
  return (dispatch, getState) => {

    if (isFetchingNextReplyPage(getState)) {
      return Promise.resolve();
    }

    dispatch(incrementReplyPage());
    dispatch(fetchingNextReplyPage(true));

    const currentPage = getCurrentReplyPage(getState);
    const currentPerPage = getRepliesPerPage(getState);
    const currentSubmission = getCurrentSubmission(getState);

    return dispatch(getReplies(currentSubmission.submissionId, currentPage, currentPerPage))
      .then(() => dispatch(fetchingNextReplyPage(false)))
      .catch((error) => {
        dispatch(setErrorMessage('Ops, had a problem fetching submissions!'));
        dispatch(fetchingNextReplyPage(false));
      });

  };
};

export const onStartTyping = (submissionId) => {
  return (dispatch, getState) => {
    dispatch(addSubmissionIdReplyTyped(submissionId));
  };
};

export const onStopTyping = (submissionId) => {
  return (dispatch, getState) => {
    dispatch(removeSubmissionIdReplyTyped(submissionId));
  };
};
