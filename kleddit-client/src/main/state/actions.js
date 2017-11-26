import {SubkledditService as subkledditService} from "../../subkleddit/SubkledditService";
import {makeActionCreator} from '../../state/utils';

export const init = () => {
  return (dispatch, getState) => {

    subkledditService.getDefaultSubkleddits()
      .then(subkleddits => {
        subkleddits.sort((a, b) => a.subscribers - b.subscribers);
        dispatch(setDefaultSubkleddits(subkleddits));
      });

  };
};

export const SET_DEFAULT_SUBKLEDDITS = 'SET_DEFAULT_SUBKLEDDITS';
const setDefaultSubkleddits = makeActionCreator(SET_DEFAULT_SUBKLEDDITS, 'subkleddits');