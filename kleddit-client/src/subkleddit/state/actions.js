import {SubkledditService as subkledditService} from '../SubkledditService';
import {makeActionCreator} from '../../state/utils';

export const getDefaultSubkleddits = () => {
  return (dispatch, getState) => {

    return subkledditService.getDefaultSubkleddits()
      .then((subkleddits => dispatch(setDefaultSubkleddits(subkleddits))));

  };
};

export const SET_DEFAULT_SUBKLEDDITS = 'SET_DEFAULT_SUBKLEDDITS';
const setDefaultSubkleddits = makeActionCreator(SET_DEFAULT_SUBKLEDDITS, 'subkleddits');