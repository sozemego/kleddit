import {getDefaultSubkleddits} from '../../subkleddit/state/actions';

export const init = () => {
  return (dispatch, getState) => {

    dispatch(getDefaultSubkleddits());

  };
};

