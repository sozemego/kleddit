import {rootSelector} from '../../state/utils';

export const mainPageRoot = rootSelector('main');

export const getDefaultSubkleddits = (root) => root.defaultSubkleddits;