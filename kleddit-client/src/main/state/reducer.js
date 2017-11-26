import {SET_DEFAULT_SUBKLEDDITS} from './actions';

const initialState = {

  defaultSubkleddits: []

};

const main = (state = initialState, action) => {
  switch (action.type) {
    case SET_DEFAULT_SUBKLEDDITS: {
      return {...state, defaultSubkleddits: action.subkleddits}
    }
    default:
      return state;
  }
};

export default main;