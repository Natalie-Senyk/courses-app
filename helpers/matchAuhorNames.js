import {
	prop,
	curry,
	includes,
	join,
	slice,
	compose,
	filter,
	map,
} from 'ramda';

const idIsMatched = curry((arr, val) => includes(prop('id', val))(arr));
const idIsNotMatched = curry((arr, val) => !includes(prop('id', val))(arr));
const addDots = (str) => str + '...';
const getName = (author) => author.name;
const extractNames = map(getName);
const joinWithComma = join(', ');
const joinThreeOrMore = compose(addDots, joinWithComma, slice(0, 2));

const authorsNamesExtractor = (authors, isMatching) =>
	compose(extractNames, filter(isMatching))(authors);

export const getAuthorNames = (authors, courseAuthorIds) => {
	const isAuthorMatching = idIsMatched(courseAuthorIds);
	const names = authorsNamesExtractor(authors, isAuthorMatching);
	if (names.length > 2) return joinThreeOrMore(names);
	return joinWithComma(names);
};

export const getMatchedAuthors = (authors, courseAuthorIds) =>
	filter(idIsMatched(courseAuthorIds))(authors);

export const getUnMatchedAuthors = (authors, courseAuthorIds) =>
	filter(idIsNotMatched(courseAuthorIds))(authors);
