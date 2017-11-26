import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import user from '../user/state/reducer';
import main from '../main/state/reducer';

const rootReducer = combineReducers({
  user,
  main
});

export const store = createStore(
  rootReducer,
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);