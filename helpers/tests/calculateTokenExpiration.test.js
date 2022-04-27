import { calculateExpirationDate } from '../calculateTokenExpiration';

test('function calculateRemainingTime return expirationDate timestamp', () => {
	const defaultDate = 1643797195182;
	const expirationTimeStamp = defaultDate + 86400000;
	expect(calculateExpirationDate(defaultDate)).toEqual(expirationTimeStamp);
});
