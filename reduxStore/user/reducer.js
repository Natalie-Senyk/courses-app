import * as actionType from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: localStorage.getItem('token') || '',
	role: '',
	errorMessage: '',
};

export const userReducer = (state = userInitialState, action) => {
	switch (action.type) {
		case actionType.LOGIN:
			return {
				...state,
				isAuth: true,
				errorMessage: '',
				name: action.payload.user.name,
				email: action.payload.user.email,
				token: localStorage.getItem('token'),
			};
		case actionType.REGISTER:
			return {
				...state,
				errorMessage: '',
			};
		case actionType.LOGOUT:
			return {
				isAuth: false,
				name: '',
				email: '',
				token: '',
				role: '',
				errorMessage: '',
			};
		case actionType.VALIDATE_ROLE:
			return {
				...state,
				role: action.payload.role,
				name: action.payload.name,
				email: action.payload.email,
				isAuth: true,
			};
		case actionType.SET_AUTH_ERROR:
			return { ...state, errorMessage: action.payload };
		default:
			return state;
	}
};
