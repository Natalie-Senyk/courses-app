import { validateAuthor } from '../validateAuthorInfo';

describe('author validation logic when creating a new author', () => {
	test('function validateAuthor return error message "Author name can not be empty" if user didn`t fill in the name field', () => {
		expect(() => validateAuthor('')).toThrow(
			'Author name can not be less than 2 characters'
		);
	});
	test('function validateAuthor return error message "Author name can not be less than 2 characters" if name is less than 2 characters', () => {
		expect(() => validateAuthor('A')).toThrow(
			'Author name can not be less than 2 characters'
		);
	});
});
