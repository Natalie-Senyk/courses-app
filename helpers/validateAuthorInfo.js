import { trim, compose } from 'ramda';

const checkLength = (name) => name.length > 1;
const isValidAuthorName = compose(checkLength, trim);

export const validateAuthor = (authorName) => {
	if (!isValidAuthorName(authorName)) {
		throw new Error('Author name can not be less than 2 characters');
	}
};
