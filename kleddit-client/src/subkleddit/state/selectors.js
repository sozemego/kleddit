import {rootSelector} from '../../state/utils';

export const subkledditRoot = rootSelector('subkleddits');

export const getDefaultSubkleddits = (state) => subkledditRoot(state).defaultSubkleddits;
export const getDefaultSubkledditNames = (state) => subkledditRoot(state).defaultSubkleddits.map(subkleddit => subkleddit.name);