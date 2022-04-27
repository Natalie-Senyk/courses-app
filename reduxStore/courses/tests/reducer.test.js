import { coursesReducer } from '../reducer';
import { saveCourseAction, getCoursesAction } from '../actionCreators';
import { mockedCoursesList } from '../../../constants';

const initialState = {
	coursesInfo: [],
};

describe('Course reducer logic', () => {
	test('reducer should return the initial state', () => {
		expect(coursesReducer(initialState, {})).toEqual({
			coursesInfo: [],
		});
	});
	test('reducer should handle SAVE_COURSE action and returns new state', () => {
		const newCourse = {
			title: 'Angular JS',
			description:
				'this is great course for everyone who already knows basics of  JS',
			duration: 125,
			authors: [
				'9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
				'072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
			],
			creationDate: '11/01/2022',
			id: '48c2dcc6-c146-47b5-8773-8fa132dd242d',
		};
		expect(coursesReducer(initialState, saveCourseAction(newCourse))).toEqual({
			coursesInfo: [{ ...newCourse }],
		});
	});
	test('reducer should handle GET_COURSES and returns new state', () => {
		expect(
			coursesReducer(initialState, getCoursesAction(mockedCoursesList))
		).toEqual({
			coursesInfo: mockedCoursesList,
		});
	});
});
