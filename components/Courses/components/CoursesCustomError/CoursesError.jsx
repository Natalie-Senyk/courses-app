import React from 'react';
import PropTypes from 'prop-types';
import { Paper, Typography } from '@material-ui/core';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';

import useStyles from './styles.js';

const CoursesError = ({ errorMessage }) => {
	const classes = useStyles();
	const customError =
		errorMessage && !errorMessage.includes('404')
			? errorMessage
			: 'Sorry, the service is unavailble now. Try again later!';
	return (
		<Paper className={classes.paper} elevation={6}>
			<Typography
				variant='h5'
				align='center'
				className={classes.errorText}
				gutterBottom
			>
				{customError}
			</Typography>
			<div>
				<SentimentDissatisfiedIcon fontSize='large' />
			</div>
		</Paper>
	);
};

CoursesError.propTypes = {
	errorMessage: PropTypes.string,
};

export default CoursesError;
