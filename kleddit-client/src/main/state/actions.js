import {SubkledditService as subkledditService} from "../../subkleddit/SubkledditService";
import {makeActionCreator} from '../../state/utils';
import {getUsername, userRoot} from "../../user/state/selectors";
import {setSubscribedToSubkleddits} from '../../user/state/actions';

export const init = () => {
  return (dispatch, getState) => {

    const user = userRoot(getState());
    const username = getUsername(user);

    getDefaultSubkleddits()
      .then(subkleddits => {
        dispatch(setDefaultSubkleddits(subkleddits));
      })
      .then(() => {
        return getSubscribedToSubkleddits(username);
      })
      .then((subkleddits) => dispatch(setSubscribedToSubkleddits(subkleddits.map(subkleddit => subkleddit.name))));

  };
};

const getDefaultSubkleddits = () => {
  return subkledditService.getDefaultSubkleddits();
};

const getSubscribedToSubkleddits = (username) => {
  if(!username || !username.trim()) {
    return [];
  }

  return subkledditService.getSubscribedToSubkleddits(username);
};

export const SET_DEFAULT_SUBKLEDDITS = 'SET_DEFAULT_SUBKLEDDITS';
const setDefaultSubkleddits = makeActionCreator(SET_DEFAULT_SUBKLEDDITS, 'subkleddits');