import { formatDate } from '../dateGenerator';

test('function formatDate returns date in the appropriate format', () => {
	expect(formatDate('28/01/2022')).toEqual('28.01.2022');
});
