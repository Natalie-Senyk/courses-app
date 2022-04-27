import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';

import useStyles from './styles.js';
import { defaultNotFoundImage } from '../../constants';

const PageNotFound = () => {
	const classes = useStyles();

	return (
		<div>
			<Paper className={classes.paper} elevation={6}>
				<Typography gutterBottom variant='h5' color='primary' align='center'>
					The page you`re looking for is not found or you don`t have permission
					to access it.
				</Typography>
				<Link to='/courses' className={classes.linkToHome}>
					Go back to courses page.
				</Link>
				<div>
					<img
						className={classes.notFoundImage}
						src={defaultNotFoundImage}
						alt='not found'
					/>
				</div>
			</Paper>
		</div>
	);
};

export default PageNotFound;
