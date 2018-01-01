import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import app from '../app/reducer';
import user from '../user/state/reducer';
import main from '../main/reducer';
import submissions from '../submissions/reducer';

const rootReducer = combineReducers({
  app,
  user,
  main,
  submissions,
});

export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunkMiddleware,
  ),
);