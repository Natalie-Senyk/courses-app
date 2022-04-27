import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PrivateRoute } from '../components/PrivateRouter/PrivateRouter';
import { ROUTES } from './Routes';

const Router = () => {
	return (
		<Routes>
			{ROUTES.map(({ isPrivate, path, Component, isAdmin }) =>
				isPrivate ? (
					<Route
						path={path}
						key={path}
						element={<PrivateRoute component={Component} isAdmin={isAdmin} />}
					/>
				) : (
					<Route key={path} path={path} element={<Component />} />
				)
			)}
		</Routes>
	);
};

export default Router;
