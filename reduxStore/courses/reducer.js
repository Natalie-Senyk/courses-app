import * as actionType from './actionTypes';

const coursesInitialState = {
	coursesInfo: [],
	errorMessage: '',
};

export const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case actionType.GET_COURSES:
			return {
				...state,
				coursesInfo: [...action.payload],
			};
		case actionType.GET_COURSE:
			return {
				...state,
				coursesInfo: [action.payload],
			};

		case actionType.SAVE_COURSE:
			return {
				...state,
				coursesInfo: [...state.coursesInfo, action.payload],
			};
		case actionType.DELETE_COURSE:
			return {
				...state,
				coursesInfo: state.coursesInfo.filter(
					(course) => course.id !== action.payload
				),
			};
		case actionType.UPDATE_COURSE:
			return {
				...state,
				coursesInfo: state.coursesInfo.map((course) =>
					course.id === action.payload.id ? action.payload : course
				),
			};
		case actionType.SET_COURSES_ERROR:
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};
