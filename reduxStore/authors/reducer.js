import * as actionType from './actionTypes';

const authorsInitialState = {
	authorsInfo: [],
	errorMessage: '',
};

export const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case actionType.GET_AUTHORS:
			return {
				...state,
				authorsInfo: [...action.payload],
			};

		case actionType.SAVE_AUTHOR:
			return {
				...state,
				authorsInfo: [...state.authorsInfo, action.payload],
			};
		case actionType.FILTER_AUTHORS_WHEN_REMOVED:
			return {
				...state,
				authorsInfo: [action.payload, ...state.authorsInfo],
			};
		case actionType.FILTER_AUTHORS_WHEN_SELECTED:
			return {
				...state,
				authorsInfo: [
					...state.authorsInfo.filter(
						(author) => !author.id.match(action.payload)
					),
				],
			};
		case actionType.SET_AUTHORS_ERROR:
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};
