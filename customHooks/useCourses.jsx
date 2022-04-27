import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
	fetchAllCourses,
	deleteSingleCourse,
} from '../reduxStore/courses/thunk';
import { getAllCourses, getCoursesErrorMessage } from '../selectors';

export const useCourses = () => {
	const dispatch = useDispatch();
	const courses = useSelector(getAllCourses);
	const errorMessage = useSelector(getCoursesErrorMessage);
	const [loading, setLoading] = useState(false);

	const fetchCourses = useCallback(async () => {
		setLoading(true);
		await dispatch(fetchAllCourses);
		setLoading(false);
	}, [dispatch]);

	const deleteCourse = (id) => {
		dispatch(deleteSingleCourse(id));
	};

	return {
		courses,
		fetchCourses,
		deleteCourse,
		errorMessage,
		loading,
	};
};
