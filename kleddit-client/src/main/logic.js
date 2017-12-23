import { createLogic } from 'redux-logic';
import {setSubmissionErrors, VALIDATE_SUBMISSION} from './actions';

const MAX_TITLE_LENGTH = 100;
const MAX_CONTENT_LENGTH = 10000;

export const validateSubmission = createLogic({
  type: VALIDATE_SUBMISSION,
  validate({ getState, action}, allow, reject) {
    const {title, content} = action.payload;

    const error = {
      title: null,
      content: null
    };

    if(title.length === 0) {
      error.title = 'Title is too short!';
    }
    if(title.length > MAX_TITLE_LENGTH) {
      error.title = `Title is too long, it cannot be longer than ${MAX_TITLE_LENGTH}`;
    }

    if(content.length === 0) {
      error.content = 'Content is too short!';
    }
    if(content.length > MAX_CONTENT_LENGTH) {
      error.title = `Content is too long, it cannot be longer than ${MAX_CONTENT_LENGTH}`;
    }

    allow(setSubmissionErrors(error));
  },

});