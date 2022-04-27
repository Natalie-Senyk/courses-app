export function formatDurationTime(mins) {
	if (!mins) mins = 0;
	let h = Math.floor(mins / 60);
	let m = mins % 60;
	h = h < 10 ? '0' + h : h;
	m = m < 10 ? '0' + m : m;
	return `${h}:${m} ${h > 1 ? 'hours' : 'hour'}`;
}
