import { validateCourse } from '../validateCourseInfo';

describe('the validation logic when creating new course or updating existing one', () => {
	test('function validateCourse return error message "Add corresponding author!" if user didn`t add any course author', () => {
		const newCourseInfo = {
			title: 'Angular JS',
			description: 'this is great course',
			duration: 125,
			authors: [],
		};
		expect(() => validateCourse(newCourseInfo)).toThrow(
			'Add corresponding author!'
		);
	});
	test('function validateCourse return error message "Course duration can not be 0" if userdidn`t include duration or added 0', () => {
		const newCourseInfo = {
			title: 'Angular JS',
			description: 'this is great course',
			duration: 0,
			authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
		};
		expect(() => validateCourse(newCourseInfo)).toThrow(
			'Course duration can not be 0'
		);
	});
	test('function validateCourse return error message "Add longer course description" if course description is less than 2 characters', () => {
		const newCourseInfo = {
			title: 'Angular JS',
			description: 'A',
			duration: 120,
			authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
		};
		expect(() => validateCourse(newCourseInfo)).toThrow(
			'Add longer course description'
		);
	});
	test('function validateCourse return error message "Please, include course title" if user didn`t include course title', () => {
		const newCourseInfo = {
			title: '',
			description: 'this is great course',
			duration: 120,
			authors: ['9b87e8b8-6ba5-40fc-a439-c4e30a373d36'],
		};
		expect(() => validateCourse(newCourseInfo)).toThrow(
			'Please, include course title'
		);
	});
});
