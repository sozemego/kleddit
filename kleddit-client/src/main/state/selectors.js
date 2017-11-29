import {rootSelector} from '../../state/utils';

export const mainPageRoot = rootSelector('main');

export const getDefaultSubkleddits = (state) => mainPageRoot(state).defaultSubkleddits;
export const getDefaultSubkledditNames = (state) => mainPageRoot(state).defaultSubkleddits.map(subkleddit => subkleddit.name);