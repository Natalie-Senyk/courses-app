import { add } from 'date-fns';

// since no refresh token returned from backend after it expires, we logout any user after 24 hours
export const calculateExpirationDate = (date) =>
	add(date, { hours: 24 }).getTime();
