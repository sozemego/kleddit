import {applyMiddleware, combineReducers, createStore} from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import thunkMiddleware from 'redux-thunk';
import user from '../user/state/reducer';
import main from '../main/reducer';
import submissions from '../submissions/reducer';
import logic from './logic';

const rootReducer = combineReducers({
  user,
  main,
  submissions,
});

const logicMiddleware = createLogicMiddleware(logic);

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware,
    logicMiddleware,
  )
);


//REFERENCE ONLY
// eslint-disable-next-line no-unused-vars
const state = {
  user: {
    currentUser: {
      username: null,
      token: null
    },
    usernameRegistrationError: null,
    passwordRegistrationError: null,
    loginError: null,
    subscribedToSubkleddits: []
  },
  main: {
    leftSidebarShown: true,
    fetchingActions: 0,
    errorMessage: "",
    page: 1,
    perPage: 15,
    subkleddits: [],
    submissionErrors: {
      title: null,
      content: null
    },
    isFetchingNextPage: false
  },
  submissions: {
    submissions: {

    }
  }
};