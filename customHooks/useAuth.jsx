import { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import {
	login,
	logout,
	register,
	validateRole,
} from '../reduxStore/user/thunk';
import { getUserErrorMessage, getUserToken } from '../selectors';

export const useAuth = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const errorMessage = useSelector(getUserErrorMessage);
	const token = useSelector(getUserToken);
	const [loading, setLoading] = useState(false);

	const handleRegister = async (registerData) => {
		setLoading(true);
		await dispatch(register(registerData, navigate));
		setLoading(false);
	};

	const handleLogin = async (loginData) => {
		setLoading(true);
		await dispatch(login(loginData));
		setLoading(false);
	};

	const validate = useCallback(() => {
		setLoading(true);
		dispatch(validateRole);
		navigate('/courses');

		setLoading(false);
	}, [dispatch, navigate]);

	const handleLogout = () => {
		dispatch(logout);
		navigate('/login');
	};

	return {
		errorMessage,
		token,
		handleLogin,
		handleLogout,
		handleRegister,
		validate,
		loading,
	};
};
