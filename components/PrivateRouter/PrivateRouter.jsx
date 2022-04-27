import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { logoutAction } from '../../reduxStore/user/actionCreators';
import PageNotFound from '../PageNotFound/PageNotFound';

export const PrivateRoute = ({ component: RouteComponent, isAdmin }) => {
	const isAuthenticated = localStorage.getItem('token');
	const adminRoleConfirmed = localStorage.getItem('role') === 'admin';
	const expirationDate = localStorage.getItem('expirationDate');
	const tokenIsExpired = expirationDate && expirationDate <= Date.now();
	const dispatch = useDispatch();

	useEffect(() => {
		if (tokenIsExpired) {
			localStorage.clear();
			dispatch(logoutAction());
		}
	}, [dispatch, tokenIsExpired]);

	if (isAdmin && !tokenIsExpired) {
		if (isAuthenticated && adminRoleConfirmed) {
			return <RouteComponent />;
		}
		return <PageNotFound />;
	}

	if (isAuthenticated && !tokenIsExpired) {
		return <RouteComponent />;
	}
	return <Navigate to='/login' />;
};
