import { formatDurationTime } from '../pipeDuration';

describe('course duration formatting logic', () => {
	test('function formatDuration returns 02:00 hours if duration is 120 minutes', () => {
		expect(formatDurationTime(120)).toEqual('02:00 hours');
	});
	test('function formatDuration returns 01:00 hour if duration is 60 minutes', () => {
		expect(formatDurationTime(60)).toEqual('01:00 hour');
	});
	test('function formatDuration returns 01:30 hour if duration is 90 minutes', () => {
		expect(formatDurationTime(90)).toEqual('01:30 hour');
	});
});
