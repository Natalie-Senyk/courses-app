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

import useStyles from './styles';
import ErrorMessage from '../../common/ErrorMessage/ErrorMessage.jsx';
import { useAuth } from '../../customHooks/useAuth.jsx';

const initialState = { email: '', password: '' };

const Login = () => {
	const [loginData, setLoginData] = useState(initialState);
	const [showPassword, setShowPassword] = useState(false);
	const classes = useStyles();
	const {
		errorMessage,
		handleLogin,
		validate: validateUserRole,
		loading,
	} = useAuth();

	const handleShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleInputChange = (e) =>
		setLoginData({ ...loginData, [e.target.name]: e.target.value });

	const handleFormSubmit = async (e) => {
		e.preventDefault();
		await handleLogin(loginData);
		localStorage.getItem('token') && validateUserRole();
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
					Login
				</Typography>
				<form
					autoComplete='off'
					className={classes.form}
					onSubmit={handleFormSubmit}
				>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							<TextField
								name='email'
								type='email'
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
						Login
					</Button>
					<div className={classes.registerSubText}>
						<Typography variant='subtitle1'>
							If you don`t have an account, you can&nbsp;
							<Link className={classes.registerLink} to='/register'>
								Register
							</Link>
						</Typography>
					</div>
					{errorMessage && <ErrorMessage errorMessage={errorMessage} />}
				</form>
			</Paper>
		</Container>
	);
};

export default Login;
