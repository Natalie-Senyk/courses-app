import { join, split, compose } from 'ramda';

const joinWithDot = join('.');
const splitDate = split('/');

export const formatDate = compose(joinWithDot, splitDate);
