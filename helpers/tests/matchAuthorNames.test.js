import {
	getAuthorNames,
	getMatchedAuthors,
	getUnMatchedAuthors,
} from '../matchAuhorNames';
import { authors } from '../../__mocks__/mockAuthors';
import { courseAuthorIds } from '../../__mocks__/mockCourses';

describe('author names matching logic for courseForm component', () => {
	test('function getAuthorNames returns correct author names in the appropriate format', () => {
		expect(getAuthorNames(authors, courseAuthorIds)).toEqual('author, author3');
	});
	test('function getMatchedAuthors returns course-relevant authors`info when the course is being updated', () => {
		expect(getMatchedAuthors(authors, courseAuthorIds)).toEqual([
			{
				name: 'author',
				id: '9b87e8b8-6ba5-40fc-a439-c4e30a373d36',
			},
			{
				name: 'author3',
				id: '072fe3fc-e751-4745-9af5-aa9eed0ea9ed',
			},
		]);
	});
	test('function getUnMatchedAuthors returns unselected authors when the course is being updated', () => {
		expect(getUnMatchedAuthors(authors, courseAuthorIds)).toHaveLength(4);
	});
});
