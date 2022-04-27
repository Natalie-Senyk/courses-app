import * as api from '../../services';
import {
	loginAction,
	logoutAction,
	registerAction,
	setAuthErrorAction,
	validateRoleAction,
} from './actionCreators';
import { calculateExpirationDate } from '../../helpers/calculateTokenExpiration';

export const register = (registerData, navigate) => async (dispatch) => {
	try {
		await api.handleRegister(registerData);
		dispatch(registerAction());
		navigate('/login');
	} catch (error) {
		if (error.message.includes(400)) {
			dispatch(
				setAuthErrorAction(
					'Make sure you entered valid email and password field is not empty'
				)
			);
		} else {
			dispatch(setAuthErrorAction(error.message));
		}
	}
};

export const login = (loginData) => async (dispatch) => {
	try {
		const { result, user } = await api.handleLogin(loginData);
		localStorage.setItem('token', result);
		localStorage.setItem('name', user.name ?? 'admin');
		localStorage.setItem('expirationDate', calculateExpirationDate(new Date()));
		dispatch(loginAction({ result, user }));
	} catch (error) {
		if (error.message.includes(400)) {
			// Don`t want to show "Request failed with status code 400"
			dispatch(
				setAuthErrorAction('Email or password is not valid. Please try again!')
			);
		} else {
			dispatch(setAuthErrorAction(error.message));
		}
	}
};

export const logout = async (dispatch) => {
	await api.handleLogout();
	localStorage.clear();
	dispatch(logoutAction());
};

export const validateRole = async (dispatch) => {
	try {
		const { role, email, name } = await api.handleRoleValidation();
		localStorage.setItem('role', role);
		dispatch(validateRoleAction({ role, email, name }));
	} catch (error) {
		dispatch(setAuthErrorAction(error.message));
	}
};
