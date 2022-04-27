import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import CourseForm from '../CourseForm';
import {
	getMatchedAuthors,
	getUnMatchedAuthors,
} from '../../../helpers/matchAuhorNames';
import { mockedState } from '../../../__mocks__/mockState';

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

const MockedCreateCourseComponent = () => {
	return (
		<Provider store={mockedStore}>
			<BrowserRouter>
				<CourseForm />
			</BrowserRouter>
		</Provider>
	);
};

describe('CourseForm component', () => {
	test('CourseForm shows all authors', () => {
		render(<MockedCreateCourseComponent />);
		const authors = screen.getAllByTestId('author');
		expect(authors).toHaveLength(6);
	});
	test('CourseForm shows unselected course authors (when editing the course)', async () => {
		const authors = mockedState.authors.authorsInfo;
		const courseAuthorIds = mockedState.courses.coursesInfo[0].authors;
		expect(getUnMatchedAuthors(authors, courseAuthorIds)).toHaveLength(4);
	});
	test('CourseForm for new course doesn`t have Delete Author btn, as no authors selected yet', () => {
		render(<MockedCreateCourseComponent />);
		const deleteAuthorBtn = screen.queryByRole('button', {
			name: 'Delete author',
		});
		expect(deleteAuthorBtn).toBeNull();
	});
	test('CourseForm shows selected course authors when the selected course is being updated', async () => {
		const authors = mockedState.authors.authorsInfo;
		const courseAuthorIds = mockedState.courses.coursesInfo[0].authors;
		expect(getMatchedAuthors(authors, courseAuthorIds)).toHaveLength(2);
	});
	test('Create new author btn should call dispatch', () => {
		render(<MockedCreateCourseComponent />);
		const createAuthorBtn = screen.getByRole('button', {
			name: 'Create author',
		});
		const inputField = screen.getByPlaceholderText('Author name');
		userEvent.type(inputField, 'James Brown');
		userEvent.click(createAuthorBtn);
		expect(mockedStore.dispatch).toHaveBeenCalled();
		expect(mockedStore.dispatch).toHaveBeenCalledTimes(1);
	});
	test('Add author btn should add author to course authors and remove from all authors list', async () => {
		render(<MockedCreateCourseComponent />);
		const addAuthorBtns = screen.getAllByRole('button', {
			name: 'Add author',
		});
		expect(addAuthorBtns).toHaveLength(6);
		userEvent.click(addAuthorBtns[0]);
		const courseSelectedAuthors = await screen.findAllByTestId(
			'selectedAuthors'
		);
		expect(courseSelectedAuthors).toHaveLength(1);
	});
	test('Delete author btn should remove author from course authors and add him back to all authors list', async () => {
		render(<MockedCreateCourseComponent />);
		const addAuthorBtns = screen.getAllByRole('button', {
			name: 'Add author',
		});
		userEvent.click(addAuthorBtns[0]);
		const courseSelectedAuthors = await screen.findAllByTestId(
			'selectedAuthors'
		);
		const deleteAuthorBtns = screen.getAllByRole('button', {
			name: 'Delete author',
		});
		expect(courseSelectedAuthors).toHaveLength(1);
		userEvent.click(deleteAuthorBtns[0]);
		expect(screen.queryAllByTestId('selectedAuthors').length).toBe(0);
	});
});
