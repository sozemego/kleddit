import {rootSelector} from '../../state/utils';

export const mainPageRoot = rootSelector('main');

export const isLeftSidebarShown = state => mainPageRoot(state).leftSidebarShown;

export const isFetching = state => mainPageRoot(state).fetchingActions > 0;