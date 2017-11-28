import {SubkledditService as subkledditService} from "../../subkleddit/SubkledditService";
import {makeActionCreator} from '../../state/utils';

export const init = () => {
  return (dispatch, getState) => {

    getDefaultSubkleddits()
      .then(subkleddits => {
        dispatch(setDefaultSubkleddits(subkleddits));
      });
  };
};

const getDefaultSubkleddits = () => {
  return subkledditService.getDefaultSubkleddits();
};

export const SET_DEFAULT_SUBKLEDDITS = 'SET_DEFAULT_SUBKLEDDITS';
const setDefaultSubkleddits = makeActionCreator(SET_DEFAULT_SUBKLEDDITS, 'subkleddits');