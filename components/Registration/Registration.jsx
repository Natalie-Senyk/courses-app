import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
	Container,
	Grid,
	Paper,
	TextField,
	Typography,
	InputAdornment,
	IconButton,
	Button,
	CircularProgress,
} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

import ErrorMessage from '../../common/ErrorMessage/ErrorMessage.jsx';
import useStyles from './styles.js';
import { useAuth } from '../../customHooks/useAuth.jsx';

const initialState = { name: '', email: '', password: '' };

const Registration = () => {
	const [registerData, setRegisterData] = useState(initialState);
	const [showPassword, setShowPassword] = useState(false);
	const classes = useStyles();
	const { errorMessage, handleRegister, loading } = useAuth();

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleInputChange = (e) =>
		setRegisterData({ ...registerData, [e.target.name]: e.target.value });

	const handleFormSubmit = (e) => {
		e.preventDefault();
		const registerUserData = {
			...registerData,
			email: registerData.email.toLowerCase(),
		};
		handleRegister(registerUserData);
	};

	if (loading) {
		return (
			<div className={classes.centerProgress}>
				<CircularProgress />
			</div>
		);
	}
	return (
		<Container component='main' maxWidth='xs'>
			<Paper elevation={6} className={classes.paper}>
				<Typography component='h1' variant='h5'>
					Registration
				</Typography>
				<form
					autoComplete='off'
					className={classes.form}
					onSubmit={handleFormSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name='name'
								variant='outlined'
								label='Name'
								onChange={handleInputChange}
								autoFocus
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name='email'
								variant='outlined'
								label='Email'
								onChange={handleInputChange}
								fullWidth
								required
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								name='password'
								label='Password'
								onChange={handleInputChange}
								type={showPassword ? 'text' : 'password'}
								fullWidth
								required
								variant='outlined'
								InputProps={{
									endAdornment: (
										<InputAdornment position='end'>
											<IconButton onClick={handleShowPassword}>
												{showPassword === 'password' ? (
													<Visibility />
												) : (
													<VisibilityOff />
												)}
											</IconButton>
										</InputAdornment>
									),
								}}
							/>
						</Grid>
					</Grid>
					<Button
						type='submit'
						fullWidth
						variant='contained'
						color='primary'
						className={classes.submit}
					>
						Sign Up
					</Button>
					<div className={classes.loginSubText}>
						<Typography variant='subtitle1'>
							If you have an account, you can&nbsp;
							<Link className={classes.loginLink} to='/login'>
								Login
							</Link>
						</Typography>
					</div>
					{errorMessage && <ErrorMessage errorMessage={errorMessage} />}
				</form>
			</Paper>
		</Container>
	);
};

export default Registration;
