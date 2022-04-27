import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SearchBar from '../SearchBar';

describe('SearchBar component', () => {
	const onChange = jest.fn();
	const onSearch = jest.fn();

	beforeEach(() => {
		render(<SearchBar inputValue='' onChange={onChange} onSearch={onSearch} />);
	});

	test('Search input and search btn are both visible', () => {
		expect(screen.getByLabelText('Enter course name...')).toBeVisible();
		expect(screen.getByRole('button', { name: 'Search' })).toBeVisible();
	});
	test('User typing text is visible when user types angular in input filed', () => {
		const searchInput = screen.getByLabelText('Enter course name...');
		userEvent.type(searchInput, 'angular');
		expect(screen.getByDisplayValue('angular')).toBeVisible();
	});
	test('Function onSearch is triggerred when user types smth and clicks Search btn', () => {
		const searchInput = screen.getByLabelText('Enter course name...');
		const searchBtn = screen.getByRole('button', { name: 'Search' });
		userEvent.type(searchInput, 'angular');
		userEvent.click(searchBtn);
		expect(onSearch).toHaveBeenCalled();
	});
	test('Function onChange is triggerred when user types smth in input field', () => {
		const searchInput = screen.getByLabelText('Enter course name...');
		userEvent.type(searchInput, 'an');
		expect(onChange).toHaveBeenCalledTimes(2);
	});
});
