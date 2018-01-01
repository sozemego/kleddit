import { rootSelector } from '../state/utils';

export const appRoot = rootSelector('app');

export const isFetching = state => appRoot(state).fetchingActions > 0;
export const getErrorMessage = state => appRoot(state).errorMessage;