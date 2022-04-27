import React from 'react';
import { Paper, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

import useStyles from './styles.js';

const ErrorMessage = ({ errorMessage }) => {
	const classes = useStyles();
	return (
		<Paper>
			<Typography className={classes.errorMessage} variant='h6'>
				{errorMessage}
			</Typography>
		</Paper>
	);
};

ErrorMessage.propTypes = {
	errorMessage: PropTypes.string.isRequired,
};

export default ErrorMessage;
