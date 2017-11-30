import {getDefaultSubkleddits, loadSubmissions} from '../../subkleddit/state/actions';

export const init = () => {
  return (dispatch, getState) => {

    dispatch(getDefaultSubkleddits());
    dispatch(loadSubmissions());

  };
};

