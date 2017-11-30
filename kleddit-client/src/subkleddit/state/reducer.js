import {SET_DEFAULT_SUBKLEDDITS, SET_SUBMISSIONS} from './actions';

const initialState = {

  defaultSubkleddits: [],
  submissions: []

};

const subkleddits = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT_SUBKLEDDITS: {
      return {...state, defaultSubkleddits: action.subkleddits}
    }
    case SET_SUBMISSIONS: {
      return {...state, submissions: action.submissions};
    }
    default:
      return state;
  }
};

export default subkleddits;