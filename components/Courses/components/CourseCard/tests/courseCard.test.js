import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import CourseCard from '../CourseCard';
import { mockedCourse } from '../../../../../__mocks__/mockSingleCourse';

describe('CourseCard component', () => {
	const onDelete = jest.fn();
	const onShowInfo = jest.fn();
	const onEdit = jest.fn();
	const isAdmin = true;
	const authorNames = 'author, author3';
	beforeEach(() => {
		render(
			<CourseCard
				course={mockedCourse}
				onDelete={onDelete}
				onShowInfo={onShowInfo}
				onEdit={onEdit}
				isAdmin={isAdmin}
				authorNames={authorNames}
			/>
		);
	});
	test('Coursecard displays title', () => {
		expect(screen.getByText('Angular JS')).toBeVisible();
	});
	test('Coursecard displays description', () => {
		expect(screen.getByText(/this is great course/i)).toBeVisible();
	});
	test('Coursecard displays duration in correct format', () => {
		expect(screen.getByText(/hours?/i)).toBeVisible();
	});
	test('Coursecard displays authors list', async () => {
		waitFor(() => {
			expect(screen.getByText(/author, author3/i)).toBeVisible();
		});
	});
	test('Coursecard displays creation date in correct format', () => {
		expect(screen.getByText(/11.01.2022/)).toBeVisible();
	});
	test('Coursecard triggers onShowInfo on "Show course" btn click', () => {
		const showInfoBtn = screen.getByRole('button', { name: 'Show course' });
		userEvent.click(showInfoBtn);
		expect(onShowInfo).toHaveBeenCalled();
	});
	test('Coursecard triggers onEdit on "Edit" btn click', () => {
		const editBtn = screen.getAllByRole('button')[1];
		userEvent.click(editBtn);
		expect(onEdit).toHaveBeenCalled();
	});
	test('Coursecard triggers onDelete on "Delete" btn click', () => {
		const deleteBtn = screen.getAllByRole('button')[2];
		userEvent.click(deleteBtn);
		expect(onDelete).toHaveBeenCalled();
	});
});
