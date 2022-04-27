import React from 'react';
import PropTypes from 'prop-types';
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { formatDate } from '../../../../helpers/dateGenerator.js';
import { formatDurationTime } from '../../../../helpers/pipeDuration.js';
import { defaultImage } from '../../../../constants.js';
import useStyles from './styles.js';

const CourseCard = ({
	course: { title, description, image, duration, creationDate, authors, id },
	authorNames,
	onDelete,
	onShowInfo,
	onEdit,
	isAdmin,
}) => {
	const classes = useStyles();

	return (
		<>
			<Card className={classes.card} elevation={5}>
				<CardMedia
					image={image || defaultImage}
					title={title}
					className={classes.cardImage}
				/>
				<CardContent className={classes.cardContent}>
					<div className={classes.cardText}>
						<Typography variant='h5' gutterBottom>
							{title}
						</Typography>
						<Typography variant='body2' component='p' gutterBottom>
							{description}
						</Typography>
					</div>
					<div>
						<Typography variant='subtitle1'>
							<strong>Authors: </strong>
							{authorNames}
						</Typography>
						<Typography variant='subtitle1'>
							<strong>Duration: </strong>
							{formatDurationTime(duration)}
						</Typography>
						<Typography variant='subtitle1'>
							<strong>Created: </strong>
							{creationDate && formatDate(creationDate)}
						</Typography>
					</div>
				</CardContent>
				<CardActions>
					<Button
						variant='outlined'
						color='secondary'
						fullWidth
						onClick={onShowInfo}
					>
						Show course
					</Button>
					{isAdmin && (
						<>
							<Button onClick={onEdit}>
								<EditIcon />
							</Button>
							<Button onClick={onDelete}>
								<DeleteIcon />
							</Button>
						</>
					)}
				</CardActions>
			</Card>
		</>
	);
};

CourseCard.propTypes = {
	course: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		image: PropTypes.string,
		duration: PropTypes.number.isRequired,
		authors: PropTypes.arrayOf(PropTypes.string),
		id: PropTypes.string.isRequired,
	}),
	authorNames: PropTypes.string.isRequired,
	onDelete: PropTypes.func.isRequired,
	onShowInfo: PropTypes.func.isRequired,
	onEdit: PropTypes.func.isRequired,
	isAdmin: PropTypes.bool.isRequired,
};

export default CourseCard;
