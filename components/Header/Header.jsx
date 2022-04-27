import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Typography, Button, Toolbar, Avatar } from '@material-ui/core';

import Logo from '../Logo/Logo.jsx';
import { defaultProfileImage } from '../../constants.js';
import useStyles from './styles.js';
import { useAuth } from '../../customHooks/useAuth.jsx';

const Header = () => {
	const classes = useStyles();
	const token = localStorage.getItem('token');
	const userName = localStorage.getItem('name');
	const { handleLogout } = useAuth();

	return (
		<AppBar className={classes.headerBar} position='static' color='inherit'>
			<Link to='/courses' className={classes.headerLogo}>
				<Typography
					className={classes.heading}
					variant='h2'
					color='primary'
					align='center'
				>
					Courses
				</Typography>
				<Logo />
			</Link>
			{token && (
				<Toolbar className={classes.toolbar}>
					<Avatar
						className={classes.profileImage}
						alt={userName ?? 'user photo'}
						src={defaultProfileImage}
					>
						{userName?.charAt(0)}
					</Avatar>
					<Typography className={classes.userName} variant='h6'>
						{userName || 'admin'}
					</Typography>

					<Button variant='contained' color='primary' onClick={handleLogout}>
						Logout
					</Button>
				</Toolbar>
			)}
		</AppBar>
	);
};

export default Header;
