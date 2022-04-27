import * as actionType from './actionTypes';

export const loginAction = (loginData) => {
	return {
		type: actionType.LOGIN,
		payload: loginData,
	};
};

export const registerAction = () => {
	return {
		type: actionType.REGISTER,
	};
};

export const logoutAction = () => {
	return {
		type: actionType.LOGOUT,
	};
};

export const validateRoleAction = ({ role, name, email }) => {
	return {
		type: actionType.VALIDATE_ROLE,
		payload: { role, name, email },
	};
};
export const setAuthErrorAction = (errorMessage) => {
	return {
		type: actionType.SET_AUTH_ERROR,
		payload: errorMessage,
	};
};
