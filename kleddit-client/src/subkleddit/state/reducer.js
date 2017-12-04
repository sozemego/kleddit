import {SET_SUBKLEDDITS, SET_SUBMISSIONS} from './actions';

const initialState = {

  subkleddits: [],
  submissions: []

};

const subkleddits = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUBKLEDDITS: {
      return {...state, subkleddits: action.subkleddits}
    }
    case SET_SUBMISSIONS: {
      return {...state, submissions: action.submissions};
    }
    default:
      return state;
  }
};

export default subkleddits;