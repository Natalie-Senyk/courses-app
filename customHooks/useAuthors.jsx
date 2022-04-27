import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAllAuthors } from '../reduxStore/authors/thunk';
import { getAllAuthors, getAuthorsErrorMessage } from '../selectors';

export const useAuthors = () => {
	const dispatch = useDispatch();
	const authors = useSelector(getAllAuthors);
	const errorMessage = useSelector(getAuthorsErrorMessage);
	const [loading, setLoading] = useState(false);

	const fetchAuthors = useCallback(async () => {
		setLoading(true);
		await dispatch(fetchAllAuthors);
		setLoading(false);
	}, [dispatch]);

	return {
		authors,
		fetchAuthors,
		errorMessage,
		loading,
	};
};
