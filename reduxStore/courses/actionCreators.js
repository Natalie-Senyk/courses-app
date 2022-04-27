import * as actionType from './actionTypes';

export const getCoursesAction = (courses) => {
	return {
		type: actionType.GET_COURSES,
		payload: courses,
	};
};

export const getCourseAction = (course) => {
	return {
		type: actionType.GET_COURSE,
		payload: course,
	};
};

export const saveCourseAction = (newCourseAdded) => {
	return {
		type: actionType.SAVE_COURSE,
		payload: newCourseAdded,
	};
};

export const updateCourseAction = (course) => {
	return {
		type: actionType.UPDATE_COURSE,
		payload: course,
	};
};

export const deleteCourseAction = (courseId) => {
	return {
		type: actionType.DELETE_COURSE,
		payload: courseId,
	};
};

export const updateCourse = (updatedCourse) => {
	return {
		type: actionType.UPDATE_COURSE,
		payload: updatedCourse,
	};
};

export const setCoursesErrorAction = (errorMessage) => {
	return {
		type: actionType.SET_COURSES_ERROR,
		payload: errorMessage,
	};
};
