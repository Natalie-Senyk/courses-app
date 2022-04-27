import React, { useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext({
	token: '',
	saveToken: () => {},
	userName: '',
	saveUserName: () => {},
	logout: () => {},
});

const AuthContextProvider = (props) => {
	const [token, setToken] = useState(localStorage.getItem('token'));
	const [userName, setUserName] = useState(localStorage.getItem('userName'));

	const saveToken = (authToken) => {
		setToken(authToken);
	};
	const saveName = (name) => {
		setUserName(name);
	};

	const logout = () => {
		setUserName('');
		setToken('');
		localStorage.removeItem('token');
		localStorage.removeItem('userName');
	};

	const authContextValue = {
		token: token,
		saveToken: saveToken,
		userName: userName,
		saveUserName: saveName,
		logout: logout,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{props.children}
		</AuthContext.Provider>
	);
};

AuthContextProvider.propTypes = {
	children: PropTypes.element.isRequired,
};

export default AuthContextProvider;
