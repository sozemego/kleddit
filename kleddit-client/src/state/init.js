import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {createLogger} from 'redux-logger';
import user from '../user/state/reducer';
import main from '../main/state/reducer';
import subkleddits from '../subkleddit/state/reducer';

const rootReducer = combineReducers({
  user,
  main,
  subkleddits
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware,
    createLogger()
  )
);