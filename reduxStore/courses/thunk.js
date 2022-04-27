import * as api from '../../services';
import {
	deleteCourseAction,
	getCourseAction,
	getCoursesAction,
	saveCourseAction,
	setCoursesErrorAction,
	updateCourseAction,
} from './actionCreators';

export const fetchAllCourses = async (dispatch) => {
	try {
		const courses = await api.fetchCourses();
		dispatch(getCoursesAction(courses));
	} catch (error) {
		dispatch(setCoursesErrorAction(error.message));
	}
};

export const fetchSingleCourse = (courseId) => async (dispatch) => {
	try {
		const course = await api.fetchCourse(courseId);
		dispatch(getCourseAction(course));
	} catch (error) {
		dispatch(setCoursesErrorAction(error.message));
	}
};

export const saveCourse = (course) => async (dispatch) => {
	try {
		const newCourse = await api.createCourse(course);
		dispatch(saveCourseAction(newCourse));
	} catch (error) {
		dispatch(setCoursesErrorAction(error.message));
	}
};

export const updateCourse = (course, courseId) => async (dispatch) => {
	try {
		const updatedCourse = await api.updateSelectedCourse(course, courseId);
		dispatch(updateCourseAction(updatedCourse));
	} catch (error) {
		dispatch(setCoursesErrorAction(error.message));
	}
};

export const deleteSingleCourse = (courseId) => async (dispatch) => {
	try {
		await api.deleteSelectedCourse(courseId);
		dispatch(deleteCourseAction(courseId));
	} catch (error) {
		dispatch(setCoursesErrorAction(error.message));
	}
};
