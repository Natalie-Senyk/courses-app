import * as actionType from './actionTypes';

export const getAuthorsAction = (authors) => {
	return {
		type: actionType.GET_AUTHORS,
		payload: authors,
	};
};

export const saveAuthorAction = (newAuthor) => {
	return {
		type: actionType.SAVE_AUTHOR,
		payload: newAuthor,
	};
};

export const filterAuthorsWhenRemoved = (authorInfo) => {
	return {
		type: actionType.FILTER_AUTHORS_WHEN_REMOVED,
		payload: authorInfo,
	};
};

export const filterAuthorsWhenSelected = (courseAuthorId) => {
	return {
		type: actionType.FILTER_AUTHORS_WHEN_SELECTED,
		payload: courseAuthorId,
	};
};

export const setAuthorsErrorAction = (errorMessage) => {
	return {
		type: actionType.SET_AUTHORS_ERROR,
		payload: errorMessage,
	};
};
