import {applyMiddleware, combineReducers, createStore} from 'redux';
import { createLogicMiddleware } from 'redux-logic';
import thunkMiddleware from 'redux-thunk';
import user from '../user/state/reducer';
import main from '../main/state/reducer';
import subkleddits from '../subkleddit/state/reducer';
import logic from './logic';

const rootReducer = combineReducers({
  user,
  main,
  subkleddits
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