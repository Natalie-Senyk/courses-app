import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import Courses from '../Courses';
import {
	mockedEmptyCourseState,
	mockedErrorCourseState,
	mockedState,
} from '../../../__mocks__/mockState';

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedEmptyCourseStore = {
	getState: () => mockedEmptyCourseState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const mockedErrorCourseStore = {
	getState: () => mockedErrorCourseState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const MockedCoursesComponent = () => {
	return (
		<Provider store={mockedStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);
};

const MockedCoursesNoCourse = () => {
	return (
		<Provider store={mockedEmptyCourseStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);
};

const MockedErrorCourses = () => {
	return (
		<Provider store={mockedErrorCourseStore}>
			<BrowserRouter>
				<Courses />
			</BrowserRouter>
		</Provider>
	);
};

const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useNavigate: () => mockedNavigate,
}));

describe('Courses component', () => {
	test('the number of coursecards displayed on courses page is equal to the length of coursesInfo array', async () => {
		render(<MockedCoursesComponent />);
		const courseCards = await screen.findAllByText(/Duration:/i);
		expect(courseCards.length).toBe(1);
	});
	test('Courses display message that no course found if there are 0 courses', async () => {
		render(<MockedCoursesNoCourse />);
		waitFor(async () => {
			const noCourseFoundMessage = await screen.findByText(
				/No courses found matching your query./i
			);
			expect(noCourseFoundMessage).toBeVisible();
		});
	});
	test('If loading, spinner is visible first and then courses appear', async () => {
		render(<MockedCoursesComponent />);
		waitFor(async () => {
			const spinner = await screen.findByTestId('spinner');
			expect(spinner).toBeVisible();
		});
		expect(screen.queryByTestId('spinner')).toBeNull();
	});
	test('Btn "Create new course" is not visible if no admin role extractred from', async () => {
		render(<MockedCoursesNoCourse />);
		const newCourseBtn = screen.queryByRole('button', {
			name: 'Add new course',
		});
		expect(newCourseBtn).toBeNull();
	});
	test('Btn "Create new course" is visible and course form is shown when clicking on btn if the role is admin', async () => {
		localStorage.setItem('token', 'test token');
		localStorage.setItem('name', 'admin');
		localStorage.setItem('role', 'admin');
		render(<MockedCoursesComponent />);
		const newCourseBtn = await screen.findByRole('button', {
			name: 'Add new course',
		});
		userEvent.click(newCourseBtn);
		expect(mockedNavigate).toHaveBeenCalledTimes(1);
		expect(mockedNavigate).toHaveBeenCalledWith('/courses/add');
	});
	test('Error message is displayed on courses page, if there is error when fetching courses', async () => {
		render(<MockedErrorCourses />);
		waitFor(async () => {
			const errorCoursesMessage = await screen.findByText(
				/Please, contact your support team, the service is not available now/i
			);
			expect(errorCoursesMessage).toBeVisible();
		});
	});
});
