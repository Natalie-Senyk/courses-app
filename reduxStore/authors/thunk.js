import * as api from '../../services';
import {
	getAuthorsAction,
	saveAuthorAction,
	setAuthorsErrorAction,
} from './actionCreators';

export const fetchAllAuthors = async (dispatch) => {
	try {
		const authors = await api.fetchAuthors();
		dispatch(getAuthorsAction(authors));
	} catch (error) {
		dispatch(setAuthorsErrorAction(error.message));
	}
};

export const saveAuthor = (author) => async (dispatch) => {
	try {
		const newAuthor = await api.createAuthor(author);
		dispatch(saveAuthorAction(newAuthor));
	} catch (error) {
		dispatch(setAuthorsErrorAction(error.message));
	}
};
